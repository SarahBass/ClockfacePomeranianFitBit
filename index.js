/*
 *  Project:    Versa 2 Dog Clock Face
 *  Mail:       darahbass@gmail.com
 *  Github:     SarahBass
 *  Credit:     volkan-labs reading-watch-face
 *  Credit:     mihaibabusca SnowflakeClockface
 *  Credit:     denk0403 Mario-Fitbit-Watchface
 */


import { geolocation } from "geolocation";
import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from 'power';
import { display } from "display";
import { today as userActivity } from "user-activity";

import { vibration } from "haptics";
// Update the clock 
clock.granularity = "seconds";
let date = document.getElementById("date");


//SCENE
let background = document.getElementById("background");
let ambutton = document.getElementById("ambutton");  
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





// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  
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
  if (battery.chargeLevel > 15){
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
  if (userActivity.adjusted.steps >1999){
    background.image = "nightgoal1.png";
  }else if (userActivity.adjusted.steps >2499){
    background.image = "nightgoal2.png";
  }else if (userActivity.adjusted.steps >2999){
    background.image = "nightgoal3.png";
  }else{
  background.image = "batterydogscreen.png";}
  ambutton.text = "pm";
  ambutton.onactivate = function(evt) {
  vibration.start("ping");}
  
}




function setToMorning() {
  if (userActivity.adjusted.steps >499){
    background.image = "daygoal1.png";
  }else if (userActivity.adjusted.steps >999){
    background.image = "daygoal2.png";
  }else if (userActivity.adjusted.steps >1499){
    background.image = "daygoal3.png";
  }else{
  background.image = "daydog.png";}
  ambutton.text = "am";
  ambutton.onactivate = function(evt) {
  vibration.start("ping");}
}

function updateScene() {
  let today = new Date();
  if (today.getTime() >= sunrise.getTime() && today.getTime() < sunset.getTime()) {
    setToMorning();
  } else {
    setToNight();
  }
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

