#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

Adafruit_BME280 bme;

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    ; // Wait serail port

  Wire.begin(0, 2); // GPIO0 = SDA, GPIO2 = SCL

  delay(1000);
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

  unsigned status;
  status = bme.begin(0x76);

  if (!status)
  {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1)
      ;
  }
}

void loop()
{
  delay(1000);
  Serial.println(bme.readTemperature());
}
