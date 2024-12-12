#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "";
const char *password = "";

bool useWiFi = true;

Adafruit_BME280 bme;
LiquidCrystal_I2C lcd(0x27, 16, 2);

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
  float pressure = bme.readPressure() / 100.0F; // Conversion en hPa
  return std::make_tuple(temperature, humidity, pressure);
}

void initWiFi()
{
  if (!useWiFi)
    return;
  WiFi.begin(ssid, password);
  Serial.print("Connexion au Wi-Fi");

  // Boucle jusqu'à connexion
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnecté au Wi-Fi");
  Serial.println(WiFi.localIP());
}

void managedDisconnectedWiFi()
{
  if (!useWiFi)
    return;
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Déconnexion détectée !");
    initWiFi();
  }
}

void initLCD()
{
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("TP CESI");
  lcd.setCursor(0, 1);
  lcd.print("Bloc 2");
}

void postReport(float temperature, float humidity, float pressure)
{
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Erreur : Wi-Fi non connecté !");
    return;
  }

  WiFiClient client;
  HTTPClient http;

  const char *serverUrl = "http://jsonplaceholder.typicode.com/posts";
  http.begin(client, serverUrl);

  http.addHeader("Content-Type", "application/json");

  String jsonPayload = "{\"ip\":\"" + WiFi.localIP().toString() +
                       "\",\"temperature\":" + String(temperature, 2) +
                       ",\"humidity\":" + String(humidity, 2) +
                       ",\"pressure\":" + String(pressure, 2) + "}";

  Serial.println("Envoi des données : ");
  Serial.println(jsonPayload);

  int httpCode = http.POST(jsonPayload);

  if (httpCode > 0)
  {
    Serial.printf("Code HTTP : %d\n", httpCode);
    String payload = http.getString();
    Serial.println("Réponse du serveur : ");
    Serial.println(payload);
  }
  else
  {
    Serial.printf("Erreur lors de la requête POST : %s\n",
                  http.errorToString(httpCode).c_str());
  }

  http.end();
}

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    ;
  initWiFi();

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
  Serial.println("BME280 initialisé avec succès !");

  initLCD();
}

void loop()
{
  delay(5000);

  managedDisconnectedWiFi();

  auto [temperature, humidity, pressure] = readBME280Data();

  postReport(temperature, humidity, pressure);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("T:");
  lcd.print(temperature);
  lcd.print("C H:");
  lcd.print(humidity);
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print("P:");
  lcd.print(pressure);
  lcd.print("hPa");
}
