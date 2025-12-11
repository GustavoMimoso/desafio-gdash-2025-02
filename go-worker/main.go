package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type WeatherData struct {
	Location    string    `json:"location" bson:"location"`
	Temperature float64   `json:"temperature" bson:"temperature"`
	Humidity    int       `json:"humidity" bson:"humidity"`
	WindSpeed   float64   `json:"windSpeed" bson:"windSpeed"`
	Description string    `json:"description" bson:"description"`
	Timestamp   time.Time `json:"timestamp" bson:"timestamp"`
}

var mongoClient *mongo.Client

func init() {
	godotenv.Load()
}

func connectMongo() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "mongodb://admin:admin123@mongodb:27017/gdash?authSource=admin"
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(dbURL))
	if err != nil {
		return err
	}

	mongoClient = client
	return mongoClient.Ping(ctx, nil)
}

func saveWeatherData(data WeatherData) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := mongoClient.Database("gdash").Collection("weather")
	_, err := collection.InsertOne(ctx, data)
	return err
}

func main() {
	log.Println("🌦️ GDASH Go Worker Started")

	// Connect to MongoDB
	if err := connectMongo(); err != nil {
		log.Fatalf("MongoDB connection failed: %v", err)
	}
	defer mongoClient.Disconnect(context.Background())
	log.Println("✅ MongoDB connected")

	// Connect to RabbitMQ
	rabbitmqURL := os.Getenv("RABBITMQ_URL")
	if rabbitmqURL == "" {
		rabbitmqURL = "amqp://admin:admin123@rabbitmq:5672/"
	}

	conn, err := amqp.Dial(rabbitmqURL)
	if err != nil {
		log.Fatalf("RabbitMQ connection failed: %v", err)
	}
	defer conn.Close()
	log.Println("✅ RabbitMQ connected")

	// Create channel
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("Channel creation failed: %v", err)
	}
	defer ch.Close()

	// Declare queue
	q, err := ch.QueueDeclare(
		"weather_queue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Queue declaration failed: %v", err)
	}

	// Set QoS
	ch.Qos(1, 0, false)

	// Consume messages
	msgs, err := ch.Consume(
		q.Name,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("Consume failed: %v", err)
	}

	log.Println("👂 Listening for messages...")

	for msg := range msgs {
		var data WeatherData
		if err := json.Unmarshal(msg.Body, &data); err != nil {
			log.Printf("❌ Error unmarshaling: %v", err)
			msg.Nack(false, true)
			continue
		}

		// Parse timestamp
		if t, err := time.Parse(time.RFC3339, data.Timestamp.String()); err == nil {
			data.Timestamp = t
		} else {
			data.Timestamp = time.Now()
		}

		// Save to MongoDB
		if err := saveWeatherData(data); err != nil {
			log.Printf("❌ Error saving: %v", err)
			msg.Nack(false, true)
			continue
		}

		log.Printf("✅ Saved: %s - %.1f°C", data.Location, data.Temperature)
		msg.Ack(false)
	}
}
