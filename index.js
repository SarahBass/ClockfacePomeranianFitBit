/*
 *  Project:    Versa 2 Dog Clock Face
 *  Mail:       darahbass@gmail.com
 *  Github:     SarahBass
 *  Credit:     volkan-labs reading-watch-face
 *  Credit:     https://dev.fitbit.com/ and Forums
 *  Credit:     denk0403 Mario-Fitbit-Watchface
 
 button opens menu
 ufo button closes menu
 bone button opens food page
 ball button opens play page
 dog button opens statistics page
 */


import { geolocation } from "geolocation";
import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from 'power';
import { display } from "display";
import { today as userActivity } from "user-activity";
import { Accelerometer } from "accelerometer";

import { vibration } from "haptics";
// Update the clock 
clock.granularity = "seconds";
let date = document.getElementById("date");


//SCENE
let background = document.getElementById("background");
let ambutton = document.getElementById("ambutton");  
let bonebutton = document.getElementById("bonebutton");  
let ufobutton = document.getElementById("ufobutton");  
let ballbutton = document.getElementById("ballbutton");  
let dogbutton = document.getElementById("dogbutton");  
let goal1button = document.getElementById("goal1button");  
let goal2button = document.getElementById("goal2button");  
let goal3button = document.getElementById("goal3button");  
let yepbutton = document.getElementById("yepbutton");  
let nopebutton = document.getElementById("nopebutton");  
let heart1 = document.getElementById("heart1");  
let heart2 = document.getElementById("heart2");
let met1 = document.getElementById("met1");  
let met2 = document.getElementById("met2");
let fed1 = document.getElementById("fed1"); 
let fed2 = document.getElementById("fed2"); 
// sunrise/sunset info
let sunrise;
let sunset;

const MS_PER_MIN = 1000 * 60;

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");

const batteryLabel = document.getElementById("batteryLabel");

const greenbatteryLabel = document.getElementById("greenbatteryLabel");

const redbatteryLabel = document.getElementById("redbatteryLabel");

const stepsLabel = document.getElementById("stepsLabel");
let bonenumber = 0;
let ballnumber = 0;
let dognumber = 0;
let ufonumber = 0;
let stringbutton = "off";
let buttonnumber = 0;
let yesnumber = 0;
let nopenumber = 0;
let metnumber = 0;
let fednumber = 0;
let heartnumber = 0;
//Activate button
  ambutton.onactivate = function(evt) {
  stringbutton = "on";
  buttonnumber++;
  if (buttonnumber > 10){
    buttonnumber = 0;}
  console.log(buttonnumber);
  vibration.start("confirmation-max");}

bonebutton.onactivate = function(evt) {
  ufonumber = 0;
  ballnumber = 0;
  dognumber = 0;
  bonenumber++;
  if (bonenumber > 3){
    bonenumber = 0;}
  vibration.start("confirmation-max");
  console.log("Bone number: ");
  console.log(bonenumber);}

ufobutton.onactivate = function(evt) {
  ballnumber = 0;
  dognumber = 0;
  bonenumber = 0;
  ufonumber++;
  if (ufonumber > 3){
    ufonumber = 0;}
  if (ufonumber == 1){
    buttonnumber = 0;
    ufonumber++;
  }
  vibration.start("confirmation-max");
  console.log("UFO number: ");
  console.log(ufonumber);}

ballbutton.onactivate = function(evt) {
  dognumber = 0;
  bonenumber = 0;
  ufonumber = 0;
  ballnumber++;
  if (ballnumber > 3){
    ballnumber = 0;}
  vibration.start("confirmation-max");
  console.log("Ball number: ");
  console.log(ballnumber);}

dogbutton.onactivate = function(evt) {
  bonenumber = 0;
  ufonumber = 0;
  ballnumber = 0;
  dognumber++;
  if (dognumber > 3){
    dognumber = 0;}
  vibration.start("confirmation-max");
  console.log("Dog number: ");
  console.log(dognumber);}


 

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (util.zeroPad(hours) <12){
  ambutton.text = "am";}
  if (util.zeroPad(hours) >= 12){ambutton.text = "pm";}
  checkAndUpdateBatteryLevel();
  stepsLabel.text = userActivity.adjusted.steps;
 
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
  if (hours === 0 && mins === 0) {
  resetDate();}
  updateScene();
 
}

display.addEventListener('change', function () {
    if (this.on) {checkAndUpdateBatteryLevel();} 
});

battery.onchange = (charger, evt) => {
    greenBatteryLevel();
}

function greenBatteryLevel() {
    greenbatteryLabel.text = `${battery.chargeLevel}%`;
}

function checkAndUpdateBatteryLevel() {
  if (battery.chargeLevel > 30){
    batteryLabel.text = `${battery.chargeLevel}%`;}
  else {redbatteryLabel.text = `${battery.chargeLevel}%`;}
}

function defaultSunsetSunrise(error) {
  sunrise = new Date();
  sunrise.setHours(6);
  sunrise.setMinutes(0);
  sunrise.setSeconds(0);
  sunset = new Date();
  sunset.setHours(20);
  sunset.setMinutes(0);
  sunset.setSeconds(0);
}

defaultSunsetSunrise(null);

function setToNight() {
    if ((userActivity.adjusted.steps >1999) && (userActivity.adjusted.steps <=2499) && (accelerometer.y < 2)){
      background.image = "nightgoal1.png";
    }else if ((userActivity.adjusted.steps >2499) && (userActivity.adjusted.steps <=2999) && (accelerometer.y < 2)){
      background.image = "nightgoal2.png";
    }else if ((userActivity.adjusted.steps >2999) && (accelerometer.y < 2)){
      background.image = "nightgoal3.png";
    }else if ((userActivity.adjusted.steps >1999) && (userActivity.adjusted.steps <=2499) && (accelerometer.y > 2)){
      background.image = "1jumpnight.png";
    }else if ((userActivity.adjusted.steps >2499) && (userActivity.adjusted.steps <=2999) && (accelerometer.y > 2)){
      background.image = "2jumpnight.png";
    }else if ((userActivity.adjusted.steps >2999) && (accelerometer.y > 2)){
      background.image = "3jumpnight.png";
    }else{background.image = "batterydogscreen.png";}
  
  
}

function setToMorning() {
    if ((userActivity.adjusted.steps >499) && (userActivity.adjusted.steps <=999) && (accelerometer.y < 2)){
      background.image = "daygoal1.png";
    }else if ((userActivity.adjusted.steps >999) && (userActivity.adjusted.steps <=1499) && (accelerometer.y < 2)){
      background.image = "daygoal2.png";
    }else if ((userActivity.adjusted.steps >1499) && (accelerometer.y < 2)){
      background.image = "daygoal3.png";
    }else if ((userActivity.adjusted.steps >1999) && (userActivity.adjusted.steps <=2499) && (accelerometer.y > 2)){
      background.image = "daygoal1jump.png";
    }else if ((userActivity.adjusted.steps >2499) && (userActivity.adjusted.steps <=2999) && (accelerometer.y > 2)){
      background.image = "daygoal2jump.png";
    }else if ((userActivity.adjusted.steps >2999) && (accelerometer.y > 2)){
      background.image = "daygoal3jump.png";
    }else{background.image = "daydog.png"; }
 }
  
function starcounter(){
  if ((buttonnumber > 1) && (buttonnumber < 10)){
  
    if ((userActivity.adjusted.steps >500) && (userActivity.adjusted.steps <=999)){
       goal1button.text = "*";
    }
    else if ((userActivity.adjusted.steps >999) && (userActivity.adjusted.steps <=1499)){
       goal2button.text = "*";
    }
    else if(userActivity.adjusted.steps > 1499) {
       goal3button.text = "*";
    }
    else { 
       goal1button.text = " ";
       goal2button.text = " ";
       goal3button.text = " ";
       }
  }else {
      goal1button.text = " ";
       goal2button.text = " ";
       goal3button.text = " ";
    }
}

function updateScene() {
  let today = new Date();
  starcounter();
  if (Accelerometer) {
   console.log("This device has an Accelerometer!");
   const accelerometer = new Accelerometer({ frequency: 1 });
   accelerometer.addEventListener("reading", () => {
     
   if  ((buttonnumber == 1)){
         
         if (bonenumber == 1){
          if (today.getTime() >= sunrise.getTime() && today.getTime() < sunset.getTime()){
          background.image = "boneday.png";
          }else{
          background.image = "bonenight.png";}
          yepbutton.text = "yes";
          nopebutton.text = "no";
          heart1.text = " "; 
          heart2.text = " "; 
          met1.text = " ";
          met2.text = " ";
          fed1.text = " ";
          fed2.text = " ";     
                              
  nopebutton.onactivate = function(evt) {
  yesnumber = 0;
  nopenumber++;
  if (nopenumber > 3){
    nopenumber = 0;}
  if (nopenumber == 1){
    buttonnumber = 0;
    nopenumber++;
  vibration.start("ping");
  }  
  console.log("nope number: ");
  console.log(nopenumber);
 }

yepbutton.onactivate = function(evt) {
  nopenumber = 0;
  yesnumber++;
  if (yesnumber > 3){
    yesnumber = 0;}
  if (yesnumber == 1){
    buttonnumber = 10;
    fednumber++;
    yesnumber++;
  vibration.start("ping");
  }  
  console.log("yes number: ");
  console.log(yesnumber);
  console.log("fed number: ");
  console.log(fednumber);
 }

         }
         else if (dognumber == 1){
          if (today.getTime() >= sunrise.getTime() && today.getTime() < sunset.getTime()){
            background.image = "statisticsday.png";
          }else{
          background.image = "statisticsnight.png";}
          yepbutton.text = " ";
          nopebutton.text = "RES";
           
          if ((userActivity.adjusted.steps >1499)&&(userActivity.adjusted.steps <=2999)){
          met1.text = "met";
          }
          
          if (userActivity.adjusted.steps >2999){
          met1.text = "met";
          met2.text = "met";
          }
           if (heartnumber == 1){                        
          heart1.text = "<3";}
          
           if (heartnumber > 1){
          heart1.text = "<3";   
          heart2.text = "<3";}
          
           if (heartnumber < 1){ 
          heart2.text = " ";  
          heart1.text = " ";} 
           
          if (fednumber == 1){                       
          fed1.text = "fed";}
          
           if (fednumber > 1){ 
          fed1.text = "fed";   
          fed2.text = "fed";}
          
          if (fednumber < 1){ 
          fed2.text = " ";  
          fed1.text = " ";}                           
         
   }
         else if (ballnumber == 1){
          if (today.getTime() >= sunrise.getTime() && today.getTime() < sunset.getTime()){
          background.image = "ballday.png";
          }else{
          background.image = "ballnight.png";}
          yepbutton.text = "yes";
          nopebutton.text = "no"; 
          heart1.text = " "; 
          heart2.text = " "; 
          met1.text = " ";
          met2.text = " ";
          fed1.text = " ";
          fed2.text = " "; 
                                   
            nopebutton.onactivate = function(evt) {
  yesnumber = 0;
  nopenumber++;
  if (nopenumber > 3){
    nopenumber = 0;}
  if (nopenumber == 1){
    buttonnumber = 0;
    nopenumber++;
  vibration.start("ping");
  }  
  console.log("nope number: ");
  console.log(nopenumber);
 }

yepbutton.onactivate = function(evt) {
  nopenumber = 0;
  yesnumber++;
  if (yesnumber > 3){
    yesnumber = 0;}
  if (yesnumber == 1){
    heartnumber++;
    buttonnumber = 0;
    yesnumber++;
  vibration.start("ping");
  }  
  console.log("yes number: ");
  console.log(yesnumber);
  console.log("heart number: ");
  console.log(heartnumber);
 }                         
         }
         else {
          if (today.getTime() >= sunrise.getTime() && today.getTime() < sunset.getTime()){
           background.image = "openappsday.png"; 
          }
          else{
          background.image = "openappsnight.png";}
          yepbutton.text = " ";
          nopebutton.text = " ";
          heart1.text = " "; 
          heart2.text = " "; 
          met1.text = " ";
          met2.text = " ";
          fed1.text = " ";
          fed2.text = " ";        
          }
   }
   else if  ((buttonnumber == 2)){
          yepbutton.text = " ";
          nopebutton.text = " ";
          heart1.text = " "; 
          heart2.text = " "; 
          met1.text = " ";
          met2.text = " ";
          fed1.text = " ";
          fed2.text = " ";     
         if (accelerometer.y < 2){
         background.image = "desertdog1.png";}
         else {background.image = "desertdog2.png";}}
        
   else if  ((buttonnumber == 3)){
        
         if (accelerometer.y < 2){
         background.image = "waterdog1.png";}
         else {background.image = "waterdog2.png";}}
           
   else if  ((buttonnumber == 4)){
         
         if (accelerometer.y < 2){
         background.image = "roomdog1.png";}
         else {background.image = "roomdog2.png";}}
           
   else if  ((buttonnumber == 5)){
         
         if (accelerometer.y < 2){
         background.image = "waterfalldog1.png";}
         else {background.image = "waterfalldog2.png";}}
        
   else if  ((buttonnumber == 6)){
         
         if (accelerometer.y < 2){
         background.image = "sultandog1.png";}
         else {background.image = "sultandog2.png";}}
           
   else if  ((buttonnumber == 7)){
         
         if (accelerometer.y < 2){
         background.image = "forestdog1.png";}
         else {background.image = "forestdog2.png";}}
           
   else if  ((buttonnumber == 8)){
       
         if (accelerometer.y < 2){
         background.image = "campdog1.png";}
         else {background.image = "campdog2.png";}}
          
   else if  ((buttonnumber == 9)){
         yesnumber = 0;
         if (accelerometer.y < 2){
         background.image = "room1.png";}
         else {background.image = "room2.png";}}
     
   else if  ((buttonnumber == 10) && (yesnumber == 2)){
          yepbutton.text = " ";
          nopebutton.text = " ";
          heart1.text = " "; 
          heart2.text = " "; 
          met1.text = " ";
          met2.text = " ";
          fed1.text = " ";
          fed2.text = " ";     
         vibration.start("ring");
         if (accelerometer.y < 2){
         
         background.image = "thanksdog1.png";}
         else {background.image = "thanksdog2.png";}}     
     
   else{
              yesnumber = 0;
              vibration.stop("ring");
              yepbutton.text = " ";
              nopebutton.text = " ";
              heart1.text = " "; 
              heart2.text = " "; 
              met1.text = " ";
              met2.text = " ";
              fed1.text = " ";
              fed2.text = " ";     
                
                if (today.getTime() >= sunrise.getTime() && today.getTime() < sunset.getTime()) {
                  
                  setToMorning();}
                else{
                  if (today.getHours() == 10) {
                    if (accelerometer.y < 2){background.image = "sleepflat1.png";}
                    else{background.image = "sleepflat2.png";}}
                  
                  else if (today.getHours() == 11) {
                    if (accelerometer.y < 2){background.image = "sleepupside1.png";}
                    else{background.image = "sleepupside2.png";}}
                  
                  else if (today.getHours() == 12) {
                    if (accelerometer.y < 2){background.image = "sleep1dog.png";}
                    else{background.image = "sleep2dog.png";}}
                  
                  else{setToNight();}
                  }
       }
  });     
       accelerometer.start();
  }
  else {console.log("This device does NOT have an Accelerometer!");}
  
}


function updateSunsetSunrise(position) {
  let loc = position.coords;
  var times = answer.getTimes(new Date(), loc.latitude, loc.longitude);
  sunrise = times.sunrise;
  sunset = times.sunset;
  updateScene();
}


function resetDate() {
  geolocation.getCurrentPosition(updateSunsetSunrise, defaultSunsetSunrise);
}


