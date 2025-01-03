#include "Arduino.h"
#include "Wire.h"
#include "i2c.h"

void scanI2CDevices()
{
    Serial.println("\nScannig I2C...");

    int foundDevices = 0;
    for (byte address = 1; address < 127; address++)
    {
        Wire.beginTransmission(address);
        if (Wire.endTransmission() == 0)
        {
            Serial.print("Device found at address 0x");
            Serial.println(address, HEX);
            foundDevices++;
        }
    }

    if (foundDevices == 0)
    {
        Serial.println("No I2C devices detected.");
    }
    else
    {
        Serial.print("Total number of devices detected: ");
        Serial.println(foundDevices);
    }
}
