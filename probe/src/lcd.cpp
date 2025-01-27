#include <LiquidCrystal_I2C.h>
#include "lcd.h"

LiquidCrystal_I2C lcd(0x27, 16, 2);

void initLCD()
{
    lcd.init();
    lcd.backlight();
    lcd.setCursor(0, 0);
    lcd.print("TP CESI");
    lcd.setCursor(0, 1);
    lcd.print("Bloc 2");
    delay(1000);
}

void lcdClearAndPrint(const char *line1, const char *line2)
{
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(line1);
    if (line2)
    {
        lcd.setCursor(0, 1);
        lcd.print(line2);
    }
}

void displayReadings(float temperature, float humidity, float pressure)
{
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
