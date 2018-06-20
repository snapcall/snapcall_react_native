
import { NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter, PermissionsAndroid } from 'react-native';
import React, { Component } from 'react';
const { RNSnapcallReact } = NativeModules;

export class SnapcallParameter  extends Component {

  constructor (comp) {
    super(comp);

    this.displayBrand = null;
    this.displayName = null;
    this.callTitle = null;
    this.AssetPathImage = null;
    this.AssetPathFont = null;
    this.notificationTittle = null;
    this.notificationBody = null;
    this.externalContext = null;
    this.urlImage = null;
    this.textColor = null;
    this.pushTransfertData = null
    this.senderBrand = null;
    this.senderName = null;
    this.hideCart = true;
    this.shouldReturn = false;
  }
}

let os = Platform.OS === "ios" ? true : false;
const Snapcall_Module = NativeModules.RNSnapcallReact;
export class Snapcall  extends Component {

    constructor (comp){
      super(comp);

    }

    restorCallUI(){
      if (os){
          return Snapcall_Module.restorUI();
      }
      else {
          return Snapcall_Module.restorUI();
      }
    }

    launchCallBid(bid_id, parameter){
      let st_param = JSON.stringify(parameter);
      if (os){
         return Snapcall_Module.launchCallWithbidId(bid_id, st_param)
      }else{
         return Snapcall_Module.launchCallWithbidId(bid_id, st_param)
      }
    }

    launchCallWithIdentifier(bid_id, identifier,parameter){
      let st_param = JSON.stringify(parameter);

      if (os){
         return Snapcall_Module.launchCallWithIdentifier(bid_id, identifier, st_param);
      }else{
         return Snapcall_Module.launchCallWithIdentifier(bid_id,identifier, st_param);
      }
    }

    bidIsClosed(bid, cb){
      if (os){
        Snapcall_Module.bidIsClosed(bid).then(res=>{cb(res)}).catch(err=>{cb(false, err)});
      }
      else {
        Snapcall_Module.bidIsClosed(bid).then(res=>{cb(res)}).catch(err=>{cb(false, err)});
      }
    }

    askForPermission(Androidreason, Androidmessage){
      if (os){
        return Snapcall_Module.askPermission();
      }
      else{
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            'title': Androidreason,
            'message': Androidmessage
          })
      }

    }

    releaseSnapcall(){
      if (os){
        Snapcall_Module.releaseSnapcall();
      }else {
        Snapcall_Module.releaseSnapcall();
      }
    }

}
