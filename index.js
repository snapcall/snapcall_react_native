
import { NativeModules, Platform } from 'react-native';
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
    this.textColor = 0;
    this.pushTransfertData = null
    this.senderBrand = null;
    this.senderName = null;
    this.shouldReturn = false;
  }
}
let os = Platform.OS === "ios" ? true : false;
const Snapcall_Module = NativeModules.RNSnapcallReact;
export class Snapcall  extends Component {


    // var launched = false;

    constructor (comp){
      super(comp);
    }
    restorCallUI (){
      if (os){

          Snapcall_Module.restorUI()
          .then(res=>{console.log("succes");})
          .catch(error => {console.log(error); });
      }
      else {
        Snapcall_Module.restorUI()
          .then(res=>{console.log("succes");})
          .catch(error => {console.log(error); });
      }


    }
    launchCallBid(bid_id, parameter){
      let st_param = JSON.stringify(parameter);

      console.log("loadding")
      console.log(NativeModules);
      console.log(NativeModules.RNSnapcallReact);
      if (os){
        if (!Snapcall_Module)
          console.log("module null");
        else if (!Snapcall_Module.launchCallWithbidId)
          console.log("function null");
        // else
         Snapcall_Module.launchCallWithbidId(bid_id, st_param)
          .then(res=>{console.log("succes");})
          .catch(error => {console.log(error); });
      }else{
         Snapcall_Module.launchCall(bid_id, st_param)
          .then(res=>{console.log("succes");})
          .catch(error => {console.log(error); });
      }
    }

}


/*
 this.launchCallBid = function(){
      if (os){
         Snapcall_Module.restorUI()
          .then(res=>{console.log("succes");})
          .catch(error => {console.log(error); });
      }else{
         Snapcall_Module.restorUI()
          .then(res=>{console.log("succes");})
          .catch(error => {console.log(error); });
      }
    }
*/
