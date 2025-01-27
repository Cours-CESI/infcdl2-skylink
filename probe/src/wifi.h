#ifndef WIFI_H
#define WIFI_H

void initWiFi();
void managedDisconnectedWiFi();
void postReport(float temperature, float humidity, float pressure);

#endif
