#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "wifi.h"
#include "lcd.h"

const char *ssid = "";
const char *password = "";
const char *serverUrl = "";

bool useWiFi = true;

void initWiFi()
{
    if (!useWiFi)
        return;
    WiFi.begin(ssid, password);
    Serial.print("Wi-Fi connection");

    lcdClearAndPrint("Connecting...");

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.print(".");
    }

    Serial.println("\nConnected");
    Serial.println(WiFi.localIP());
    lcdClearAndPrint("Connected", WiFi.localIP().toString().c_str());
}

void managedDisconnectedWiFi()
{
    if (!useWiFi)
        return;
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("Disconnected");
        lcdClearAndPrint("Reconnecting...");
        initWiFi();
    }
}

void postReport(float temperature, float humidity, float pressure)
{
    if (!useWiFi)
        return;
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("Error : Wi-Fi not connected !");
        return;
    }

    WiFiClient client;
    HTTPClient http;

    http.begin(client, serverUrl);

    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{\"ip\":\"" + WiFi.localIP().toString() +
                         "\",\"temperature\":" + String(temperature, 2) +
                         ",\"humidity\":" + String(humidity, 2) +
                         ",\"pressure\":" + String(pressure, 2) + "}";

    Serial.println("Sending data: ");
    Serial.println(jsonPayload);

    int httpCode = http.POST(jsonPayload);

    if (httpCode > 0)
    {
        Serial.printf("HTTP Code : %d\n", httpCode);
        String payload = http.getString();
        Serial.println("Server Response: ");
        Serial.println(payload);
    }
    else
    {
        Serial.printf("HTTP Error : %s\n",
                      http.errorToString(httpCode).c_str());
        lcdClearAndPrint("Error", "Can't send data");
        delay(2000);
    }

    http.end();
}
