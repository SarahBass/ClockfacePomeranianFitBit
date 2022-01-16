/*
 *  Project:    Versa 2 Dog Clock Face
 *  Mail:       darahbass@gmail.com
 *  Github:     SarahBass
 *  Credit:     volkan-labs reading-watch-face
 *  Credit:     mihaibabusca SnowflakeClockface
 */



import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { battery } from 'power';
import { display } from "display";
import { today as userActivity } from "user-activity";


// Update the clock every minute
clock.granularity = "seconds";

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
}

display.addEventListener('change', function () {
    if (this.on) {
        checkAndUpdateBatteryLevel();
    } 
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
