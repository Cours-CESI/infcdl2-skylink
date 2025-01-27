#include <Arduino.h>
#include "wifi.h"
#include "lcd.h"
#include "probe.h"
#include "Wire.h"
#include "i2c.h"

void setup()
{
    Serial.begin(9600);
    Wire.begin(0, 2); // GPIO0 = SDA, GPIO2 = SCL
    delay(1000);

    scanI2CDevices();
    initBME280();
    initLCD();
    initWiFi();
}

void loop()
{
    delay(5000);
    managedDisconnectedWiFi();

    auto [temperature, humidity, pressure] = averageData(5, 500);

    postReport(temperature, humidity, pressure);

    displayReadings(temperature, humidity, pressure);
}
