let sensorData;
// let XaccelerationData;
let synchronize = document.getElementById("synchronize");
let speed;
let devices = {};
let Xa,Ya,Za;
let Xb,Yb,Zb;
let Xc,Yc,Zc;
let previousXa;

let i;
let millisecond;
let acc_magnitude1;
let acc_magnitude2;
let state = 0;
let eX_offset1;
let eX_offset2;
let eX_offset3;
let eXnew1;
let eXnew2;
let eXnew3;

let time1=[0];
let time2=[0];
let time3=[0];




let polySynth;// note duration (in seconds)
let dur = 1;// time from now (in seconds)
let time;// velocity (volume, from 0 to 1)
// let vel = 0.5;
let vel =0.5;

//this round chord progression
let randomly_generated_chord_progression=[];

let stateGraph = {
    T: {
      next: [{
          state: 'T',
          probability: 0.1
        },
        {
          state: 'SD',
          probability: 0.45
        },
        {
          state: 'D',
          probability: 0.45
        },
      ]
    },
    D: {
      next: [{
        state: 'T',
        probability: 0.8
      }, {
        state: 'SD',
        probability: 0.1
      }, {
        state: 'D',
        probability: 0.1
      }]
  
    },
    SD: {
      next: [{
        state: 'T',
        probability: 0.8
      }, {
        state: 'SD',
        probability: 0.1
      }, {
        state: 'D',
        probability: 0.1
      }]
    }
  };
  
  let ChordSelection ={
    T:[{
      state: 'Cmaj7',
      probability: 1/2
    },
      {
      state: 'Em7',
      probability: 1/8
    },
      {
      state: 'Am7',
      probability: 3/8
    }],
    D:[{
      state: 'Fmaj7',
      probability: 5/8
    },
      {
      state: 'Dm7',
      probability: 3/8
    }],
    SD:[{
      state: 'G7',
      probability: 3/4
    },
       {
      state: 'Bdim7',
      probability: 1/4
    }]
  };
  
  let currentState = 'T';
  let chord;

  let musicState = 0;
  
  


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    imuConnection.onSensorData((device) => {
       devices[device.deviceId] = device.data;
        });
        // devices[device.deviceId] = device.data;
        // XaccelerationData = device.data.linearAcceleration[0];
   
    millisecond = millis();

    let cnv = createCanvas(500, 500);
    cnv.mousePressed(playSynth);
    background(220);
    textSize(50);
    textAlign(LEFT)
    text('click to play', 80, 80);
    
  
    polySynth = new p5.PolySynth();
    generate_chord_progression(); // get chord progression in this round

}


function draw() {
    background(200, 200, 212);
    noStroke();
  
 
    
    let data1 = devices["bcddc2d001f8"]; //IMA 2
    let data2 = devices["4c11ae6e2ddc"]; //IMA 4
    let data3 = devices["4c11ae6e64a4"]; //IMA 1
 
    if (! data1) { return; }
    if (! data2) { return; }
    if (! data3) { return; }

    Xa = data1.linearAcceleration[0]; //speed
    Xb = data2.linearAcceleration[0];
    Xc = data3.linearAcceleration[0];

    Ya = data1.linearAcceleration[1]; 
    Yb = data2.linearAcceleration[1];
    Yc = data3.linearAcceleration[1];
    
    Za = data1.linearAcceleration[2]; 
    Zb = data2.linearAcceleration[2];
    Zc = data3.linearAcceleration[2];
       
    acc_magnitude1 = (sqrt(pow(Xa,2) + pow(Ya,2) + pow(Za,2)))-9.81;
    acc_magnitude2 = (sqrt(pow(Xb,2) + pow(Yb,2) + pow(Zb,2)))-9.81;
    acc_magnitude3 = (sqrt(pow(Xc,2) + pow(Yc,2) + pow(Zc,2)))-9.81;
    

    if (state == 0){
        eX_offset1 = data1.euler[2]; //initial value
        eX_offset2 = data2.euler[2]; //initial value
        eX_offset3 = data3.euler[2]; //initial value
        state =1;
    }
    

   
    // console.log(Xa);

    if (state == 1 ) {
       eXnew1 = data1.euler[2];
       eXnew2 = data2.euler[2];
       eXnew3 = data3.euler[2];
    

      if (mouseIsPressed == true){
        // playSynth();
        musicState += 1;
      }
      if(musicState == 1){
        playSynth(randomly_generated_chord_progression);
      }

////////////person 1///////////////////
        if (acc_magnitude1 > 0.5 + abs (eXnew1 - eX_offset1 > 100)){ 
          // values within the if statement are characteristics of data when a step is taken
            
            let newTime=millis();
            let laststep = time1[time1.length-1];
            if(newTime-laststep>550){
              time1.push(newTime);
              let interval1=time1[time1.length-1]-time1[time1.length-2];
              let interval2=0;
              if(time2.length!=1){
                  interval2=time2[time2.length-1]-time2[time2.length-2];
              }
              if(abs(time1[time1.length-1]-time2[time2.length-1])<500){
                  synchronize.play();
              }
              let interval3=0;
              if(time3.length!=1){
                interval3=time3[time3.length-1]-time3[time3.length-2];
              }
              if(abs(time3[time3.length-1]-time1[time1.length-1])<500){
                synchronize.play();
              }
              
              //if a step occur, calculate the step interval of data1
              if(interval1<750){
                time += dur;
                dur = 0.25;
              }else if(interval1<1250){
                time += dur;
                dur = 0.5;
              }else {
                time += dur;
                dur = 0.75;
              }
              console.log("1occur");
            }  
          }


          
///////////person 2////////////////
          if (acc_magnitude2 > 0.5 ){ // values within the if statement are characteristics of data when a step is taken
            
            let newTime=millis();
            let laststep = time1[time1.length-1];
            if(newTime-laststep>550){
              time2.push(newTime);
              let interval2=time2[time2.length-1]-time2[time2.length-2];
              let interval2=0;
              if(time2.length!=1){
                  interval2=time2[time2.length-1]-time2[time2.length-2];
              }
              if(abs(time1[time1.length-1]-time2[time2.length-1])<500){
                  synchronize.play();;
              }
              let interval3=0;
              if(time3.length!=1){
                interval3=time3[time3.length-1]-time3[time3.length-2];
              }
              if(abs(time3[time3.length-1]-time2[time2.length-1])<500){
                synchronize.play();
              }
              
              //if a step occur, calculate the step interval of data1
              
              if(interval2<750){
                time=0.25;
              }else if(interval2<1000){
                time=0.75;
              }else if(interval2<1500){
                time=1.25;
              }else{
                time=1.75;
              }
              console.log("2occur");
            }  
          }

/////////person 3////////////////
          if (acc_magnitude3 > 0.5 ){ // values within the if statement are characteristics of data when a step is taken
                      
            let newTime=millis();
            let laststep = time1[time1.length-1];
            if(newTime-laststep>550){
              time3.push(newTime);
              let interval3=time3[time3.length-1]-time3[time3.length-2];
              let interval2=0;
              if(time2.length!=1){
                  interval2=time2[time2.length-1]-time2[time2.length-2];
              }
              if(abs(time1[time1.length-1]-time2[time2.length-1])<500){
                synchronize.play();
              }
              let interval1=0;
              if(time1.length!=1){
                  interval1=time1[time1.length-1]-time1[time1.length-2];
              }
              if(abs(time3[time3.length-1]-time1[time1.length-1])<500){
                 synchronize.play();
              }
              
              //if a step occur, calculate the step interval of data1
              if(interval3<750){
                time=0.25;
              }else if(interval3<1000){
                time=0.75;
              }else if(interval3<1500){
                time=1.25;
              }else{
                time=1.75;
              }
              console.log("3occur");
            }  
          }

    
       
        


    }
  }   


function keyPressed(evt) {
    if (evt.key.match(/b/i)) {
        imuConnection.bleConnect();
    }

}

function handleStateChange() {
  nextNodes = stateGraph[currentState].next;
  let randomNum = random(1);
  var cumulatedRange = 0;
  for (let nextNode of nextNodes) {
    cumulatedRange += nextNode.probability;
    if (randomNum < cumulatedRange) {
      currentState = nextNode.state;
      //console.log(`random number is ${randomNum}`);
      chord_entry = ChordSelection[currentState];
      var cumulatedCounter = 0;
      for (let chordobject of chord_entry){
        //console.log(chordobject.probability);
        cumulatedCounter += chordobject.probability;
        if(randomNum < cumulatedCounter){
          // console.log(chordobject.state);
          chord = chordobject.state;
          console.log(`state changed to ${chord}`);
          randomly_generated_chord_progression.push(chord);
          break;
        }
      }
      //console.log(`state changed to ${currentState}`);
      break;
    }
  }
}


function generate_chord_progression(){
  for (let i = 0;i <20; i++){
    handleStateChange();
  }
}

function playSynth() {
  userStartAudio();
  let progression = randomly_generated_chord_progression;
  time = 0;
  
    for (let individual_chord of progression){
     determine_notes(individual_chord);
      // determine_notes(individual_chord);
      time += dur;
      // musicState = 0;
    }
    

}

// setInterval(playSynth, 50000);
function determine_notes(chord){

    let polySynth = new p5.PolySynth();
    
    function disposePolySynth() {
      polySynth.dispose();
      //console.info('disposed polySynth')
    }
    setTimeout(disposePolySynth, (time + dur) * 1000 + 1000);

    function play(note, vel, time, dur) {
      // console.info(note, vel, time, dur);
      polySynth.play(note, vel, time, dur);
      
    }
    
    switch(chord) {
      case 'Cmaj7':
        
        polySynth.play('C4', vel, time, dur);
        polySynth.play('E4', vel, time, dur);
        polySynth.play('G4', vel, time, dur);
        polySynth.play('B5', vel, time, dur);

        console.log("Cmaj7");

        break;
        
      case 'Dm7':
        
        polySynth.play('D4', vel, time, dur);
        polySynth.play('F4', vel, time, dur);
        polySynth.play('A4', vel, time, dur);
        polySynth.play('C5', vel, time, dur);

        console.log("Dm7");
        
        break;
        
      case 'Em7':
        
        polySynth.play('E4', vel, time, dur);
        polySynth.play('G4', vel, time, dur);
        polySynth.play('B4', vel, time, dur);
        polySynth.play('D5', vel, time, dur);

        console.log("Em7");
        
        break;
        
      case 'Fmaj7':
        
        polySynth.play('F3', vel, time, dur);
        polySynth.play('A4', vel, time, dur);
        polySynth.play('C4', vel, time, dur);
        polySynth.play('E4', vel, time, dur);

        console.log("Fmaj7");
        
        break;

      case 'G7':
        
        polySynth.play('G3', vel, time, dur);
        polySynth.play('B4', vel, time, dur);
        polySynth.play('D4', vel, time, dur);
        polySynth.play('F4', vel, time, dur);

        console.log("G7");
        
        break;

      case 'Am7':
        
        polySynth.play('A3', vel, time, dur);
        polySynth.play('C4', vel, time, dur);
        polySynth.play('E4', vel, time, dur);
        polySynth.play('G4', vel, time, dur);

        console.log("Am7");
        
        break;

      case 'Bdim7':
        
        polySynth.play('B4', vel, time, dur);
        polySynth.play('D4', vel, time, dur);
        polySynth.play('F4', vel, time, dur);
        polySynth.play('A5', vel, time, dur);

        console.log("Bdim7");
        
        break;
      default:
        // code block
    } 
   
}

