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
int button_state[MAX_BUTTONS] = { 0, 0, 0, 0 };
int last_button_state[MAX_BUTTONS] = { 0, 0, 0, 0 };
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
  if (input < MAX_BUTTONS) {
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
  start_game = false;
  input = 0;
  for (int i=0; i < MAX_BUTTONS; i++){
    button_state[i] = 0;
    last_button_state[i] = 0;
  }
  delay(200);
}


void buttonState(int index) {
  int pin = buttons[index];
  button_state[index] = digitalRead(pin);
  if (button_state[index] != last_button_state[index]) {
    if (button_state[index] == HIGH) {
      Serial.print("Button Pin # ");
      Serial.println(pin);
      inputs[input] = pin;
      input = (input + 1);
    }
    delay(50);
  }
  last_button_state[index] = button_state[index];
}