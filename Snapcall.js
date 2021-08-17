
import { NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter, PermissionsAndroid, Image } from 'react-native';
import { SnapcallListener } from './SnapcallListener'
import React from 'react';
const snapcallModule = NativeModules.RNSnapcallReact;

let os = Platform.OS === "ios" ? true : false; // identify the Platform
/**
    class to access the feature of snapcall.
 */
export class Snapcall {

    STATE_CREATED = "STATE_CREATED";
    STATE_CONNECTED = "STATE_CONNECTED";
    STATE_RECONNECT = "STATE_RECONNECT";
    STATE_TERMINATED = "STATE_TERMINATED";

    listener =  new SnapcallListener(os)

    constructor() {
      console.log("snapcall release 2.1.0-beta.6")
    }

    /** remove listener from snapcall event **/
    removeEventListener(eventName, _function) {
      this.listener.removeEventListener(eventName, _function)
    }

    /** add listener from snapcall event */
    addEventListener(eventName, _function) {
      this.listener.addEventListener(eventName, _function)
    }

    /**
      this function allow to bring to front the call ui when a call is processing.
    */
    restorCallUI() {
      return snapcallModule.restorUI();
    }

    /**
     to set or prevent the default snapcall UI
     default is active.

     @param boolean false to active
    */
    activeDefaultInterface(value) {
      return snapcallModule.activeDefaultInterface(value);
    }
    /**
      simply launch the call with the button identifier.
    **/
    launchCallBid(bid_id, parameter) {
      const st_param = JSON.stringify(parameter);
      return snapcallModule.launchCallWithbidId(bid_id, st_param)
    }

    /**
      launch the call with an identifier link to one user.
    **/
    launchCallWithIdentifier(bid_id, identifier,parameter) {
      const st_param = JSON.stringify(parameter);
      return snapcallModule.launchCallWithIdentifier(bid_id,identifier, st_param);
    }

    setApiCredentials(apiKey) {
      if (os) {
        return snapcallModule.setApiCredentials(apiKey);
      } else {
        return new Promise((resolve) => {
          const res = snapcallModule.setApiCredentials(apiKey);
          resolve(res);
        });
      }
    }

    connectAgent(agent, param) {
      if (!os) {
        return snapcallModule.connectAgent(agent, JSON.stringify(param));
      }
      return new Promise((resolve, reject) => {
        reject("not implemented")
      });
    }
    
    connectPartnerAgent(id, agent, param) {
      if (!os) {
        return snapcallModule.connectPartnerAgent(id, agent, JSON.stringify(param));
      }
      return new Promise((resolve, reject) => {
        reject("not implemented")
      });
    }

    sendPartnerCallInvitation(id, agent, chatID,  param) {
      if (!os) {
        return snapcallModule.connectSendPartnerCallInvitation(id, agent, chatID,  JSON.stringify(param));
      }
      return new Promise((resolve, reject) => {
        reject("not implemented")
      });
    }  
    
    sendPartnerCall(id, chatID, param) {
      if (!os) {
        return snapcallModule.sendPartnerCallInvitation(id, chatID,  JSON.stringify(param));
      }
      return new Promise((resolve, reject) => {
        reject("not implemented")
      });
    }

    connectPartnerAgentWithToken(id, agent, token,  param) {
      return snapcallModule.connectPartnerAgentWithToken(id, agent, token, JSON.stringify(param));
    }

    sendPartnerCallInvitationWithToken(id, agent, token, chatID,  param) {
      return snapcallModule.connectSendPartnerCallInvitationWithToken(id, agent, token, chatID,  JSON.stringify(param));
    }  
    
    sendPartnerCallWithToken(id, token, chatID, param) {
      if (!os) {
        return snapcallModule.sendPartnerCallInvitationWithToken(id, token, chatID,  JSON.stringify(param));
      }
      return new Promise((resolve, reject) => {
        reject("not implemented")
      });
    }
    
    disconnect() {
      return snapcallModule.disconnect();
    }

    /**
      Check if the button identifier allow to launch a call. If res is false the service is close (out of the shedule set on the back office).
    **/
    bidIsClosed(bid){
      return snapcallModule.bidIsClosed(bid);
    }

    getCurrentState() {
      return new Promise((resolve, reject)=> {
        snapcallModule.getCurrentState().then((result)=>{
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
      return snapcallModule.rateLastCall(rate);
    }

    setNameLabelText(nameLabelText) {
      return snapcallModule.setNameLabelText(nameLabelText);
    }

    startVideo() {
      return snapcallModule.startVideo();
    }

    pauseVideo() {
      return snapcallModule.pauseVideo();
    }

    switchCamera() {
      return snapcallModule.switchCamera();
    }

    updateUI(props) {
      return snapcallModule.updateUI(props);
    }

    mute() {
      return snapcallModule.mute();
    }

    setSpeaker() {
      return snapcallModule.setSpeaker();
    }

    hangup() {
      return snapcallModule.hangup();
    }

    getConnectedAgent() {
        return snapcallModule.getConnectedAgent()
    }
    
    getToken() {
      if (os) {
        return snapcallModule.getToken()
      }
      return new Promise((r, reject) => {
        reject("not implemented on this platform");
      });
    }

    /**
      Show the popin to ask for access on microphone feature.
    **/
    askForPermission(Androidreason, Androidmessage){
      if (os){
        return snapcallModule.askPermission();
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
      this.listener.release();
      return snapcallModule.releaseSnapcall();
    }
}
