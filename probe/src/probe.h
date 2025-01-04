#ifndef BME280_H
#define BME280_H

#include <tuple>

void initBME280();
std::tuple<float, float, float> readBME280Data();
std::tuple<float, float, float> averageData(int iterations, int delayBetweenReads);

#endif
