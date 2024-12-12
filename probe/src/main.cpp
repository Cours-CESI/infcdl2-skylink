#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

Adafruit_BME280 bme;

void scanI2CDevices()
{
  Serial.println("\nScan I2C en cours...");

  int foundDevices = 0;
  for (byte address = 1; address < 127; address++)
  {
    Wire.beginTransmission(address);
    if (Wire.endTransmission() == 0)
    {
      Serial.print("Périphérique trouvé à l'adresse 0x");
      Serial.println(address, HEX);
      foundDevices++;
    }
  }

  if (foundDevices == 0)
  {
    Serial.println("Aucun périphérique I2C détecté.");
  }
  else
  {
    Serial.print("Nombre total de périphériques détectés : ");
    Serial.println(foundDevices);
  }
}

std::tuple<float, float, float> readBME280Data()
{
  float temperature = bme.readTemperature();
  float humidity = bme.readHumidity();
  float pressure = bme.readPressure() / 100.0F; // hPa conversion
  return std::make_tuple(temperature, humidity, pressure);
}

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    ;
  Wire.begin(0, 2); // GPIO0 = SDA, GPIO2 = SCL

  delay(1000);
  scanI2CDevices();

  Serial.println("Initialisation du capteur BME280...");
  if (!bme.begin(0x76))
  {
    Serial.println("Erreur : BME280 introuvable. Vérifiez le câblage !");
    while (1)
      ;
  }
}

void loop()
{
  delay(1000);
  auto [temperature, humidity, pressure] = readBME280Data();

  Serial.print("Température : ");
  Serial.print(temperature);
  Serial.println(" °C");

  Serial.print("Humidité : ");
  Serial.print(humidity);
  Serial.println(" %");

  Serial.print("Pression : ");
  Serial.print(pressure);
  Serial.println(" hPa");
}
