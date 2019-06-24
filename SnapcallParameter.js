import { Platform, Image } from 'react-native';


let os = Platform.OS === "ios" ? true : false;
/**
    class with the differente parameter to configure the call UI and the data you send.
**/

function getImage(image) {
  const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
  if (resolveAssetSource){
    return resolveAssetSource(image);
  }
  return null;
}

export class SnapcallParameter {

  transformJsonParameter(obj) {

    return JSON.stringify(obj);
  }

  constructor () {
    this.showBackButton = false;
    this.displayBrand = null;       // brand to display on the call UI
    this.displayName = null;        // name to display on the call UI
    this.callTitle = null;          // tittle on the call UI
    this.android_AssetPathImage = null;
    this.android_AssetPathFont = null;
    this.iOS_AssetPathImage = null;
    this.iOS_AssetPathFont = null;
    this.notificationTittle = null; // title of the notification when the push is used
    this.notificationBody = null;   // body of the notification when the push is used
    this.externalContext = null;    // context to send in order to save information, you can get it back via API and the call identifier or the number on your phone.
    this.urlImage = null;           // Url for an image under the call title;
    this.textColor = null;          // color of the text in the call ui
    this.backgroundColor = null;    // color of the background in the call ui
    this.pushTransfertData = null;  // If app to app call the data to transfert directly to the other application
    this.senderBrand = null;        // if app to app call the brand to send to the other application
    this.senderName = null;         // if app to app call the name to send to the other application
    this.hideCart = true;           // boolean to hide the cart in the call UI
    this.shouldReturn = false;      // boolean if false your user will not be able to navigate on your app during the call
    this.androidResimage = null; // image name in your res folder without extension.
  }
}
