
import { NativeModules, DeviceEventEmitter, NativeEventEmitter } from 'react-native';

function onConnectionReady(parameter) {
  console.log("onConnectionReady", parameter);
  callEvent("onConnectionReady", parameter)
}

function onCreated(parameter) {
  console.log("onCreated", parameter);
  callEvent("onCreated", parameter)
}

function onRinging(parameter) {
  console.log("onRinging", parameter);
  callEvent("onRinging", parameter)
}

function onAnswer(parameter) {
  console.log("onAnswer", parameter);
  callEvent("onAnswer", parameter)
}

function onInternetDown(parameter) {
  console.log("onInternetDown", parameter);
  callEvent("onInternetDown", parameter)
}

function onInternetUP(parameter) {
  console.log("onInternetUP", parameter);
  callEvent("onInternetUP", parameter)
}

function onHangup(parameter) {
  console.log("onHangup", parameter);
  callEvent("onHangup", parameter)
}

function onMuteChange(parameter) {
  console.log("onMuteChange", parameter);
  callEvent("onMuteChange", parameter)
}

function onSpeakerChange(parameter) {
  console.log("onSpeakerChange", parameter);
  callEvent("onSpeakerChange", parameter)
}

function onHeld(parameter) {
  console.log("onHeld", parameter);
  callEvent("onHeld", parameter)
}

function onUnheld(parameter) {
  console.log("onUnheld", parameter);
  callEvent("onUnheld", parameter)
}

function onTime(parameter) {
  console.log("onTime", parameter, typeof parameter);

  callEvent("onTime", parameter)
}

function onConnectionShutDown() {
  console.log("onConnectionShutDown");
  var i = 0;
  while  (i < eventListener["onConnectionShutDown"].length){
    eventListener["onConnectionShutDown"][i]();
    i++;
  }
}

function callEvent(eventName, parameter) {
  var eventObject = null;
  console.log(parameter);
  if (typeof parameter.data == "string") {
    console.log("detec")
     eventObject = JSON.parse(parameter.data) ;
  }
  else if (parameter) {
    console.log("detec 2")
    eventObject = parameter.data
  }
  console.log("event paramter :",  eventObject);
  var i = 0;
  while  (i < eventListener[eventName].length){
    eventListener[eventName][i](eventObject);
    i++;
  }
}

const eventListener = {

  "onConnectionReady": [],
  "onCreated":  [],
  "onRinging": [],
  "onAnswer": [],
  "onInternetDown": [],
  "onInternetUP": [],
  "onHangup": [],
  "onMuteChange": [],
  "onSpeakerChange": [],
  "onHeld": [],
  "onUnheld": [],
  "onTime": [],
  "onConnectionShutDown": []
};

function getData(parameter) {
  if (parameter) {
    const clientEvent = Json.parse(parameter);
    return clientEvent.data;
  }
  return null;
}
function callEventListener(eventName, parameter) {

  const data = getData(parameter);
  var i = 0;

  if (eventListener[eventName]) {
    while (i < eventListener[eventName]) {
      eventListener[eventName][i](data);
      i++;
    }
  }
}

export class SnapcallListener {

  subscription = []

  constructor(isIOS) {
    eventEmitter = isIOS ? new NativeEventEmitter(NativeModules.RNSnapcallEmitEvent) : DeviceEventEmitter;

    this.subscription.push(eventEmitter.addListener("onConnectionReady", onConnectionReady));
    this.subscription.push(eventEmitter.addListener("onCreated", onCreated));
    this.subscription.push(eventEmitter.addListener("onRinging", onRinging));
    this.subscription.push(eventEmitter.addListener("onAnswer", onAnswer));
    this.subscription.push(eventEmitter.addListener("onInternetDown", onInternetDown));
    this.subscription.push(eventEmitter.addListener("onInternetUP", onInternetUP));
    this.subscription.push(eventEmitter.addListener("onHangup", onHangup));
    this.subscription.push(eventEmitter.addListener("onHeld", onHeld));
    this.subscription.push(eventEmitter.addListener("onUnheld", onUnheld));
    this.subscription.push(eventEmitter.addListener("onMuteChange", onMuteChange));
    this.subscription.push(eventEmitter.addListener("onSpeakerChange", onSpeakerChange));
    this.subscription.push(eventEmitter.addListener("onTime", onTime));
    this.subscription.push(eventEmitter.addListener("onConnectionShutDown", onConnectionShutDown));
  }

  release() {
    while (this.subscription[0]) {
      this.subscription[0].remove()
      delete this.subscription[0];
    }
  }

  /**
   * add a function has listner for a snapcall event.
   */
  addEventListener(eventName, functionListener) {
    if (eventListener && eventListener[eventName]) {
      eventListener[eventName].push(functionListener)
    }
  }

  /**
   * remove the first occurence of the function listener for the request
   * eventName.
   */
  removeEventListener(eventName, functionListener) {
    if (eventListener && eventListener[eventName]) {
      var i = 0;
      while (i < eventListener[eventName].length) {
        if (eventListener[i] == functionListener) {
          delete eventListener[i];
          return ;
        }
      }
    }
  }
}