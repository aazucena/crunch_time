/**
 * @file crunch_time_arduino
 * @author Aldrin Azucena (a.azucena@uleth.ca)
 * @author Sophia Mai (sophia.mai@uleth.ca)
 * @brief Alarm Clock for Crunch Time
 * @version 0.1
 * @date 2023-03-23
 * 
 * @copyright Copyright (c) 2023
 * 
 */
#include <Arduino.h>
#include <string.h>

const int MAX_BUTTONS = 4;

int buttons[MAX_BUTTONS] = { 5, 6, 7, 8 };

int combination[MAX_BUTTONS] = { 8, 7, 6 ,5 };
int inputs[MAX_BUTTONS];
int input = 0;
bool is_entered[MAX_BUTTONS] = { false, false, false, false };
bool start_game = true;

void setup()
{
  Serial.begin(9600);
  
  for (int i=0; i < MAX_BUTTONS; i++){
  	pinMode(buttons[i], OUTPUT);
  }
}


void loop(){
  if (start_game == true) {
    game();
  } else {
  
  }
}

void game() {
  if (allInputsEntered() == false) {
    for (int i=0; i < MAX_BUTTONS; i++){
      buttonState(i);
    }
  } else { 
    if (checkCombinations() == true) {
    	Serial.println("You won");
    } else {
    	Serial.println("You lost");
    }
    reset();
  }
}


bool allInputsEntered() {
  bool result = true;
  for (int i=0; i < MAX_BUTTONS; i++){
    result = result && is_entered[i];
  }
  return result;
}

bool checkCombinations() {
  bool result = true;
  for (int i=0; i < MAX_BUTTONS; i++){
   	bool comp = inputs[i] == combination[i];
    result = result && comp;
    inputs[i] = inputs[i + 1];
  }
  return result;
}

void reset() {
  for (int i=0; i < MAX_BUTTONS; i++){
   	is_entered[i] = false;
  }
  start_game = false;
  delay(200);
}


void buttonState(int index) {
  int pin = buttons[index];
  if (is_entered[index] == false) {
    int buttonPushed = digitalRead(pin);
    if (buttonPushed == HIGH) {
      Serial.print("Button Pin # ");
      Serial.println(pin);
      inputs[input] = pin;
      input = (input + 1) % MAX_BUTTONS;
      is_entered[index] = true;
    }
  }
}