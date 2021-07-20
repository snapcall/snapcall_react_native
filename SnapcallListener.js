
import { NativeModules, DeviceEventEmitter, NativeEventEmitter } from 'react-native';

function onConnectionReady(parameter) {

  callEvent("onConnectionReady", parameter)
}

function onCreated(parameter) {

  callEvent("onCreated", parameter)
}

function onRinging(parameter) {

  callEvent("onRinging", parameter)
}

function onAnswer(parameter) {

  callEvent("onAnswer", parameter)
}

function onInternetDown(parameter) {

  callEvent("onInternetDown", parameter)
}

function onInternetUP(parameter) {

  callEvent("onInternetUP", parameter)
}

function onHangup(parameter) {

  callEvent("onHangup", parameter)
}

function onMuteChange(parameter) {

  callEvent("onMuteChange", parameter)
}

function onSpeakerChange(parameter) {

  callEvent("onSpeakerChange", parameter)
}

function onHeld(parameter) {

  callEvent("onHeld", parameter)
}

function onUnheld(parameter) {

  callEvent("onUnheld", parameter)
}

function onTime(parameter) {

  callEvent("onTime", parameter)
}

function onUIRequest(parameter) {

  callEvent("onUIRequest", parameter)
}

function onConnectionShutDown() {

  var i = 0;
  while  (i < eventListener["onConnectionShutDown"].length){
    eventListener["onConnectionShutDown"][i]();
    i++;
  }
}

function callEvent(eventName, parameter) {
  var eventObject = null;

  if (typeof parameter.data === "string") {
     eventObject = JSON.parse(parameter.data) ;
  }
  else if (parameter) {
    eventObject = parameter.data
  }
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
  "onUIRequest": [],
  "onHeld": [],
  "onUnheld": [],
  "onTime": [],
  "onConnectionShutDown": []
};

export class SnapcallListener {

  subscription = []

  constructor(isIOS) {
    const eventEmitter = isIOS ? new NativeEventEmitter(NativeModules.RNSnapcallEmitEvent) : DeviceEventEmitter;

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
    this.subscription.push(eventEmitter.addListener("onUIRequest", onUIRequest));
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
      const indexOf = eventListener[eventName].indexOf(functionListener)

      if (indexOf > -1) {
        eventListener[eventName].splice(indexOf, 1);
      }
    }
  }
}
