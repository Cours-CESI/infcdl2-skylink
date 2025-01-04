#ifndef LCD_H
#define LCD_H

void initLCD();
void lcdClearAndPrint(const char *line1, const char *line2 = nullptr);
void displayReadings(float temperature, float humidity, float pressure);

#endif
