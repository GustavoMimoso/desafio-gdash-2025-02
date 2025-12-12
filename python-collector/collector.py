import os
import json
import time
import requests
import pika
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

RABBITMQ_URL = os.getenv('RABBITMQ_URL', 'amqp://admin:admin123@rabbitmq:5672')
OPENMETEO_API = 'https://api.open-meteo.com/v1/forecast'

locations = [
    {'name': 'São Paulo', 'lat': -23.5505, 'lon': -46.6333},
    {'name': 'Rio de Janeiro', 'lat': -22.9068, 'lon': -43.1729},
    {'name': 'Salvador', 'lat': -12.9714, 'lon': -38.5014},
    {'name': 'Brasília', 'lat': -15.7975, 'lon': -47.8919},
]


def get_weather_data(lat, lon):
    """Fetch weather data from Open-Meteo API"""
    try:
        params = {
            'latitude': lat,
            'longitude': lon,
            'current': 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
            'timezone': 'auto'
        }
        response = requests.get(OPENMETEO_API, params=params, timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching weather: {e}")
        return None


def weather_code_to_description(code):
    """Convert WMO weather code to description"""
    descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Foggy', 48: 'Depositing rime fog',
        51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
        61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
        71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
        80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
        85: 'Slight snow showers', 86: 'Heavy snow showers',
        95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
    }
    return descriptions.get(code, 'Unknown')


def send_to_queue(weather_data):
    """Send weather data to RabbitMQ"""
    try:
        connection = pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
        channel = connection.channel()
        channel.queue_declare(queue='weather_queue', durable=True)

        channel.basic_publish(
            exchange='',
            routing_key='weather_queue',
            body=json.dumps(weather_data),
            properties=pika.BasicProperties(delivery_mode=2)
        )

        connection.close()
        print(f"✅ Sent: {weather_data['location']}")
    except Exception as e:
        print(f"❌ Error sending to queue: {e}")


def main():
    print("🌦️  GDASH Weather Collector Started")
    print(f"Collecting from {len(locations)} locations every hour...")

    while True:
        for location in locations:
            weather = get_weather_data(location['lat'], location['lon'])

            if weather and 'current' in weather:
                current = weather['current']
                data = {
                    'location': location['name'],
                    'temperature': current['temperature_2m'],
                    'humidity': current['relative_humidity_2m'],
                    'windSpeed': current['wind_speed_10m'],
                    'description': weather_code_to_description(current['weather_code']),
                    'timestamp': datetime.now().isoformat()
                }
                send_to_queue(data)

        print(f"⏳ Next collection in 1 hour...")
        time.sleep(3600)  # 1 hour


if __name__ == '__main__':
    main()
