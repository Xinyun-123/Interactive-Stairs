# Interactive-Stairs 
## Description

The project is about music composition with people’s movements on the stairs, and the purpose of it is to encourage people to use stairs more by offering a pleasant experience on the stairs. Previously, we have seen Interactive Stairs that are instrumented by stitches in the steps. In this project, we’re trying to make wearables to detect people’s movements on the stairs and create music that corresponds to their actions. For the music part, there are three pieces of music, which are the main melody, the guitar and the bass because these are the basic elements and they are enough to play a nice composition. The notes for each piece of music is pre-programmed using chord progression; and the melody of all three pieces of music are randomly generated through the Markov chain so that each time users experience the project, the music is different and is more interesting to attract people to play with it. There will be three people taking part in the project with each person controlling one piece of music. They will wear the wearable we made that contains IMU and MCU on one of their ankles. IMU and MCU allow us to know the acceleration and direction of people’s movements so that each person is able to control one piece of music by their movements on the stairs; that is, when they step faster on the stairs, the corresponding music will be faster as well, and vice versa. Besides that, there will be bonus music added to the composition when people synchronize their steps. 

## How to use it?

* 3D print the IMU case
Link: https://www.thingiverse.com/thing:343988 
* Fit the IMU into the IMU case
* Connect IMUs with batteries
* Wear the IMU by buckling it on the left ankle, one for each user
* Run 3d-example.js 
* Connect IMU in order of how you declare them in the code
* In our original code, they are IMA2, IMA4, IMA1
```
let data1 = devices["bcddc2d001f8"]; //IMA 2
let data2 = devices["4c11ae6e2ddc"]; //IMA 4
let data3 = devices["4c11ae6e64a4"]; //IMA 1
```
* Click the screen to start
