
import { NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter, PermissionsAndroid } from 'react-native';
const { RNSnapcallReact } = NativeModules;
const Snapcall_Module = NativeModules.RNSnapcallReact;
/**
    class with the differente parameter to configure the call UI and the data you send.
**/
export class SnapcallParameter {

  constructor () {

    this.displayBrand = null;       // brand to display on the call UI
    this.displayName = null;        // name to display on the call UI
    this.callTitle = null;          // tittle on the call UI
    this.AssetPathImage = null;
    this.AssetPathFont = null;
    this.notificationTittle = null; // title of the notification when the push is used
    this.notificationBody = null;   // body of the notification when the push is used
    this.externalContext = null;    // context to send in order to save information, you can get it back via API and the call identifier or the number on your phone.
    this.urlImage = null;           // Url for an image under the call title;
    this.textColor = null;          // color of the text in the call ui
    this.pushTransfertData = null;  // If app to app call the data to transfert directly to the other application
    this.senderBrand = null;        // if app to app call the brand to send to the other application
    this.senderName = null;         // if app to app call the name to send to the other application
    this.hideCart = true;           // boolean to hide the cart in the call UI
    this.shouldReturn = false;      // boolean if false your user will not be able to navigate on your app during the call
  }
}

let os = Platform.OS === "ios" ? true : false; // identify the Platform

/**
    class to access the feature of snapcall.
**/
export class Snapcall {

    constructor (){
      this.subscription = [];
      this.eventListener = {"onUIEnd" : [], "onCallEnd" :  [], "onUIStart" : [], "onError" : [], "onStart" : [], "onTime" : [], "onCallStart":[], "onEnd" : [] };
      this.eventEmitter = os ? new NativeEventEmitter(NativeModules.CallListener) : DeviceEventEmitter;
    }

    /** remove listener to snapcall event **/
    removeEventListener(eventName, _function){
        if(this.eventListener[eventName])
        {
          var i = 0;
          while (i < this.eventListener[eventName].length)
          {
            if (this.eventListener[eventName][i].exec == _function) {
              this.eventListener[eventName][i].subscription.remove();
              delete this.eventListener[eventName][i];
            }
            i++;
          }
        }
    }

    /** add listener to snapcall event **/
    addEventListener(eventName, _function){
      if(this.eventListener[eventName] && this.eventEmitter)
      {
        const _listener =  {exec : _function ,subscription:this.eventEmitter.addListener(eventName, _function)}
        this.eventListener[eventName].push(_listener)
      }
    }
    /**
      this function allow to bring to front the call ui when a call is processing.
    **/
    restorCallUI(){
      return Snapcall_Module.restorUI();
    }

    /**
      simply launch the call with the button identifier.
    **/
    launchCallBid(bid_id, parameter){
      let st_param = JSON.stringify(parameter);
      console.log(st_param);
      return Snapcall_Module.launchCallWithbidId(bid_id, st_param)
    }

    /**
      launch the call with an identifier link to one user.
    **/
    launchCallWithIdentifier(bid_id, identifier,parameter){
      let st_param = JSON.stringify(parameter);
      return Snapcall_Module.launchCallWithIdentifier(bid_id,identifier, st_param);
    }

    /**
      Check if the button identifier allow to launch a call. If res is false the service is close (out of the shedule set on the back office).
    **/
    bidIsClosed(bid, cb){
      Snapcall_Module.bidIsClosed(bid).then(res=>{cb(res)}).catch(err=>{cb(false, err)});
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
