package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type WeatherData struct {
	Temperature string    `json:"temperature" bson:"temperature"`
	Humidity    int       `json:"humidity" bson:"humidity"`
	Pressure    int       `json:"pressure" bson:"pressure"`
	WindSpeed   int       `json:"windSpeed" bson:"windSpeed"`
	Location    string    `json:"location" bson:"location"`
	Timestamp   time.Time `json:"timestamp" bson:"timestamp"`
	Description string    `json:"description" bson:"description"`
}

func main() {
	fmt.Println("🚀 GDASH Go Worker iniciado")

	// Conecta ao RabbitMQ
	conn, err := amqp.Dial(os.Getenv("RABBITMQ_URL"))
	if err != nil {
		log.Fatalf("❌ Erro ao conectar RabbitMQ: %v", err)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("❌ Erro ao abrir channel: %v", err)
	}
	defer ch.Close()

	// Declara fila
	q, err := ch.QueueDeclare(
		"weather_data",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("❌ Erro ao declarar fila: %v", err)
	}

	// Conecta ao MongoDB
	mongoCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoClient, err := mongo.Connect(mongoCtx, options.Client().ApplyURI(os.Getenv("DATABASE_URL")))
	if err != nil {
		log.Fatalf("❌ Erro ao conectar MongoDB: %v", err)
	}
	defer mongoClient.Disconnect(context.Background())

	// Verifica conexão MongoDB
	if err := mongoClient.Ping(context.Background(), nil); err != nil {
		log.Fatalf("❌ MongoDB não respondeu: %v", err)
	}

	fmt.Println("✅ Conectado ao MongoDB e RabbitMQ")

	collection := mongoClient.Database("gdash").Collection("weathers")

	// Consome mensagens
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
		log.Fatalf("❌ Erro ao registrar consumidor: %v", err)
	}

	fmt.Println("⏳ Aguardando mensagens...")

	for d := range msgs {
		var weather WeatherData
		err := json.Unmarshal(d.Body, &weather)
		if err != nil {
			fmt.Printf("❌ Erro ao decodificar: %v\n", err)
			d.Nack(false, true) // Requeue
			continue
		}

		// Salva no MongoDB
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		result, err := collection.InsertOne(ctx, weather)
		cancel()

		if err != nil {
			fmt.Printf("❌ Erro ao salvar no MongoDB: %v\n", err)
			d.Nack(false, true) // Requeue
			continue
		}

		fmt.Printf("✅ Dado climático salvo: %v | %s\n", result.InsertedID, weather.Location)
		d.Ack(false)
	}
}
