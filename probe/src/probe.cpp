#include <Adafruit_BME280.h>
#include "probe.h"

Adafruit_BME280 bme;

void initBME280()
{
    Serial.println("Initializing BME280...");
    if (!bme.begin(0x76))
    {
        Serial.println("Error : BME280 not found. Check wiring!");
        while (1)
            ;
    }
    Serial.println("BME280 initialized successfully!");
}

std::tuple<float, float, float> readBME280Data()
{
    float temperature = bme.readTemperature();
    float humidity = bme.readHumidity();
    float pressure = bme.readPressure() / 100.0F;
    return std::make_tuple(temperature, humidity, pressure);
}

std::tuple<float, float, float> averageData(int iterations, int delayBetweenReads)
{
    float totalTemperature = 0;
    float totalHumidity = 0;
    float totalPressure = 0;

    for (int i = 0; i < iterations; i++)
    {
        auto [temperature, humidity, pressure] = readBME280Data();
        totalTemperature += temperature;
        totalHumidity += humidity;
        totalPressure += pressure;
        delay(delayBetweenReads);
    }

    float averageTemperature = totalTemperature / iterations;
    float averageHumidity = totalHumidity / iterations;
    float averagePressure = totalPressure / iterations;

    return std::make_tuple(averageTemperature, averageHumidity, averagePressure);
}
