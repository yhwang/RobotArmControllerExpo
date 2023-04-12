# A Hobby Project to Create a Full Scale Robot Arm

Have you ever wanted to build a robot arm that can do tedious tasks for you?
I started a similar project with my child and came to the moment to have an App or tool to control the robot arm.
In this repository, I use React Native as the front end and Express.js as the back end. Currently, the controller
is very limited, since we only have one axis/joint for the robot arm. More content and features will be implemented
and pushed here while the project proceeds.

## High-Level Architecture

`React Native` <==> `Express.js` <==> `SerialPort` <==> `Arduino` <==> `Robot Arm`

I am using Expo in the development phase and use Expo Go to play with the controller interface. In my environment,
both React Native and Express.js are running on a Raspberry Pi 4 Model B which uses a serial port to talk to my
Arduino Wifi Uno Rev.2. Yes, I had programmed the Arduino to use Wifi at the very beginning. However, I found the
serial port is more straightforward and stable than Wifi.

The first axis of the robot arm is formed by a Nema 23 (23HS32-4004S) and a 3D-printed RV reducer with a 1:20 gear ratio.
All of these are new to me, except the programming part. I need to learn how to connect and use the stepper motor, driver,
and Arduino Uno from the very basics. More detailed information will be added soon.
