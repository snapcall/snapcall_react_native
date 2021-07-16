
import { NativeModules, DeviceEventEmitter, NativeEventEmitter, Platform } from 'react-native';

let os = Platform.OS === "ios" ? true : false; 

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

function onError(parameter) {

  callEvent("onError", parameter)
}

function onAgentConnected(parameter) {
  let i = 0;
  while  (i < eventListener["onAgentConnected"].length){
    eventListener["onAgentConnected"][i](parameter);
    i++;
  }
}

function onLocalVideoInfo(parameter) {
  callEvent("onLocalVideoInfo", parameter)
}

function onRemoteVideoInfo(parameter) {
  callEvent("onRemoteVideoInfo", parameter)
}

function onCallActivityCreate(parameter) {
  callEventBlank("onCallActivityCreate", parameter)
}

function onCallActivityDestroy(parameter) {
  callEventBlank("onCallActivityDestroy", parameter)
}

function onMessage(parameter) {
  callEvent("onMessage", parameter)
}

function onUnhook(parameter) {
  callEvent("onUnhook", parameter)
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

function callEventBlank(eventName) {
  let i = 0;
  while  (i < eventListener[eventName].length){
    eventListener[eventName][i](eventName);
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
  "onConnectionShutDown": [],
  "onError": [],
  "onAgentConnected": [],
  "onMessage": [], 
  "onUnhook": [],
  "onRemoteVideoInfo": [],
  "onLocalVideoInfo": [],
  "onCallActivityDestroy": [],
  "onCallActivityCreate": [],
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
    if (!os) {
      this.subscription.push(eventEmitter.addListener("onError", onError));
      this.subscription.push(eventEmitter.addListener("onAgentConnected", onAgentConnected));
      this.subscription.push(eventEmitter.addListener("onRemoteVideoInfo", onRemoteVideoInfo));
      this.subscription.push(eventEmitter.addListener("onMessage", onMessage));
      this.subscription.push(eventEmitter.addListener("onUnhook", onUnhook));
      this.subscription.push(eventEmitter.addListener("onLocalVideoInfo", onLocalVideoInfo));
      this.subscription.push(eventEmitter.addListener("onCallActivityDestroy", onCallActivityCreate));
      this.subscription.push(eventEmitter.addListener("onCallActivityCreate", onCallActivityDestroy));
    }
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
