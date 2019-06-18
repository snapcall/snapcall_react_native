
import { NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter, PermissionsAndroid, Image } from 'react-native';
import { SnapcallListener } from './SnapcallListener'
import React from 'react';
const { RNSnapcallReact } = NativeModules;
const Snapcall_Module = NativeModules.RNSnapcallReact;

let os = Platform.OS === "ios" ? true : false; // identify the Platform
/**
    class to access the feature of snapcall.
 */
export class Snapcall {

    listener =  new SnapcallListener(os)

    constructor() {
      console.log("snapcall release 1.2.0")
    }

    /** remove listener from snapcall event **/
    removeEventListener(eventName, _function) {
      this.listener.removeEventListener(eventName, _function)
    }

    /** add listener from snapcall event */
    addEventListener(eventName, _function){
      this.listener.addEventListener(eventName, _function)
    }

    /**
      this function allow to bring to front the call ui when a call is processing.
    */
    restorCallUI() {
      return Snapcall_Module.restorUI();
    }

    /**
     to set or prevent the default snapcall UI
     default is active.

     @param boolean false to active
    */
    activeDefaultInterface(value) {

      return Snapcall_Module.activeDefaultInterface(value);
    }
    /**
      simply launch the call with the button identifier.
    **/
    launchCallBid(bid_id, parameter){
      console.log("launchcall",parameter);
      let st_param = parameter.transformJsonParameter(parameter);
      console.log(st_param);
      return Snapcall_Module.launchCallWithbidId(bid_id, st_param)
    }

    /**
      launch the call with an identifier link to one user.
    **/
    launchCallWithIdentifier(bid_id, identifier,parameter){
      let st_param = parameter.transformJsonParameter(parameter);
      return Snapcall_Module.launchCallWithIdentifier(bid_id,identifier, st_param);
    }

    /**
      Check if the button identifier allow to launch a call. If res is false the service is close (out of the shedule set on the back office).
    **/
    bidIsClosed(bid, cb){
      return Snapcall_Module.bidIsClosed(bid);
    }

    getCurrentState() {
      return new Promise((resolve, reject)=> {
        Snapcall_Module.getCurrentState().then((result)=>{
            if (!os) {
              resolve(JSON.parse(result));
            }else {
              resolve(result);
            }
        }).catch(()=>{
            reject("snapcall not connected");
        });
      })
    }

    rateLastCall(rate) {
      return Snapcall_Module.rateLastCall(rate);
    }

    mute() {
      return Snapcall_Module.mute();
    }

    setSpeaker() {
      return Snapcall_Module.setSpeaker();
    }

    hangup() {
      return Snapcall_Module.hangup();
    }

    /**
      Show the popin to ask for access on microphone feature.
    **/
    askForPermission(Androidreason, Androidmessage){
      if (os){
        return Snapcall_Module.askPermission();
      }
      else{
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,{
            'title': Androidreason,
            'message': Androidmessage});
      }
    }
    /**
      call this function in order to release the reference on snapcall so it can be free
    **/
    releaseSnapcall(){
      Snapcall_Module.releaseSnapcall();
    }
}
