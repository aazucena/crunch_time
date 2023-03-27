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

int buttons[MAX_BUTTONS] = { 5, 4, 3, 2 };

int RED_LED_PIN = 13;
int GREEN_LED_PIN = 12;
int BLUE_LED_PIN = 11;


int combination[MAX_BUTTONS] = { 2, 3, 4 ,5 };
int inputs[MAX_BUTTONS];
int button_state[MAX_BUTTONS] = { 0, 0, 0, 0 };
int last_button_state[MAX_BUTTONS] = { 0, 0, 0, 0 };
int input = 0;
bool is_entered[MAX_BUTTONS] = { false, false, false, false };
bool start_game = true;

void establishContact() {
  int count = 0;
  while (Serial.available() <= 0) {
    Serial.println("Connected to Arduino");   // send a capital A
    delay(300);
    if (count >= 1) {
      break;
    } else {
      count++;
    }
  }
}

void setup()
{
  Serial.begin(9600);
  pinMode(RED_LED_PIN,   OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(BLUE_LED_PIN,  OUTPUT);
  
  for (int i=0; i < MAX_BUTTONS; i++){
  	pinMode(buttons[i], OUTPUT);
  }
  establishContact();
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


void lightLED(int pin) {
  switch(pin) {
    case 5:
      analogWrite(RED_LED_PIN,   255);
      analogWrite(GREEN_LED_PIN, 0);
      analogWrite(BLUE_LED_PIN,  0);
      break;
    case 4:
      analogWrite(RED_LED_PIN,   0);
      analogWrite(GREEN_LED_PIN, 255);
      analogWrite(BLUE_LED_PIN,  0);
      break;
    case 3:
      analogWrite(RED_LED_PIN,   0);
      analogWrite(GREEN_LED_PIN, 0);
      analogWrite(BLUE_LED_PIN,  255);
      break;
    case 2:
      analogWrite(RED_LED_PIN,   255);
      analogWrite(GREEN_LED_PIN, 255);
      analogWrite(BLUE_LED_PIN,  255);
      break;
    default:
      analogWrite(RED_LED_PIN,   0);
      analogWrite(GREEN_LED_PIN, 0);
      analogWrite(BLUE_LED_PIN,  0);
      break;
  }
  delay(100);
  analogWrite(RED_LED_PIN,   0);
  analogWrite(GREEN_LED_PIN, 0);
  analogWrite(BLUE_LED_PIN,  0);
}


void buttonState(int index) {
  int pin = buttons[index];
  button_state[index] = digitalRead(pin);
  if (button_state[index] != last_button_state[index]) {
    if (button_state[index] == HIGH) {
      inputs[input] = pin;
      input = (input + 1) % MAX_BUTTONS;
      lightLED(pin);
      Serial.println(pin);
    }
    delay(50);
  }
  last_button_state[index] = button_state[index];
}




void game() {
  for (int i=0; i < MAX_BUTTONS; i++) {
    buttonState(i);
  }
}


void loop(){
  game();
}
