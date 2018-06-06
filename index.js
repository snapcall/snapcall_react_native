
import { NativeModules, Platform } from 'react-native';

const { RNSnapcallReact } = NativeModules;


export class SnapcallParameter {

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

export class Snapcall {

    var launched = false;
    let os = Platform.OS === "ios" ? true : false;

    var Snapcall_Module = NativeModules.RNSnapcallReact;
    this.restorCallUI = function(){
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
    this.launchCallBid = function(bid_id, parameter){
      let st_param = JSON.stringify(parameter);


      if (os){
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
