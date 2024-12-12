#include <Arduino.h>

// put function declarations here:
void sayHello(String greetings);

void setup()
{
  Serial.begin(9600);
  // put your setup code here, to run once:
  sayHello("Hello");
}

void loop()
{
  // put your main code here, to run repeatedly:
}

// put function definitions here:
void sayHello(String greetings)
{
  Serial.println(greetings);
}
