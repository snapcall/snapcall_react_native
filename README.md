#Snapcall React Native Module#

## Getting Started ##

This npm package is a wrapper for the Snapcall native IOs and Android library to add VOIP functionality to a mobile application.
It comport :
  -ObjectiveC Code to wrap Swift Snapcall framework
  -ObjectiveC Code to export the module to React JS
  -Java code to export the Snapcall AAR library to React JS
  -Js code to expose native API

## OS/Hardware requirements ##

Android :
  - min Sdk Version set to 16
  - Created with Android Studio 3.1.0
IOs :
  - min IOs version is 10, can compile up to 8

Created with react-native version 0.55.4 on MacOs.
Android sdk created with Android Studio 3.1.3 .
IOs sdk created with Android Studio 9.3.1 .

## Import ##

In your package.json add Snapcall dependencies :
  "RNSnapcallReact": "git+https://(urls a definir))/seampl/react-native-sdk.git"

Run `npm install RNSnapcallReact` to install all your dependencies.
Run `react-native link RNSnapcallReact` to import the native part.

IOs only :

Snapcall Swift framework come from cocoapod

  pod 'Snapcall_Framework', :git => 'https://snapcall@bitbucket.org/seampl/framework_snapcall_ios.git',:tag => '5.0.0'

this pod use SwiftWebSocket as dependency to avoid to fix some error for swift 4  set the dependency source :
  pod 'SwiftWebSocket', :git => 'https://github.com/pnoyelle/SwiftWebSocket.git',:branch => 'master'

add plist entries :

  -> Privacy - Microphone Usage Description for audio permission
  -> Privacy - Camera Usage Description for video permission. Some part of snapcall framework symbol use apple video api. To avoid to be rejected by apple application store add this entries either you don't use video.
  -> Required background modes : App provides Voice over IP services

Android specific :
If you clean your Android Project and RNSnapcallReact java library you will need to sync again. the framework is directly cloned in Build part.

## Use ##

import :
  import {Snapcall, SnapcallParameter} from 'RNSnapcallReact';

Make a call :

  var snapcall = new Snapcall();
  var parameter = new SnapcallParameter();
  snapcall.launchCallBid("bid", parameter);

Check for button diponibility :

  snapcall.bidIsClosed(bid, (res)=>{
    if (!res)
    {
      showButton();
    }
    })

Get Audio Permission :

  snapcall.askForPermission(Androidreason, Androidmessage)

  Parameter are for Android only.

Restor UI of call during a snapCall Call

  Snapcall.restorCallUI()

Release native part :

  Snapcall.releaseSnapcall()

Follow the Snapcall call Event :
  import { NativeModules, Platform, DeviceEventEmitter, NativeEventEmitter } from 'react-native';

To manage event in snapcall you need to register to the event fired by snapCall
  this.subscription = [];
IOs:

  this.eventEmitter = new NativeEventEmitter(NativeModules.CallListener);
  this.subscription.push(this.eventEmitter.addListener('SnapcallTime', ()=>{}));
  this.subscription.push(this.eventEmitter.addListener('SnapcallUIEnd', ()=>{}));
  this.subscription.push(this.eventEmitter.addListener('SnapcallCallEnd', ()=>{}));
  this.subscription.push(this.eventEmitter.addListener('SnapcallUIStart', ()=>{}));
  this.subscription.push(this.eventEmitter.addListener('SnapcallError', ()=>{}));
  this.subscription.push(this.eventEmitter.addListener('SnapcallCallStart', ()=>{}));
  this.subscription.push(this.eventEmitter.addListener('SnapcallStart', ()=>{}));

Android :

    this.subscription.push(DeviceEventEmitter.addListener('SnapcallUIEnd', ()=>{}));
    this.subscription.push(DeviceEventEmitter.addListener('SnapcallCallEnd', ()=>{}));
    this.subscription.push(DeviceEventEmitter.addListener('SnapcallUIStart', ()=>{}));
    this.subscription.push(DeviceEventEmitter.addListener('SnapcallError', ()=>{}));
    this.subscription.push(DeviceEventEmitter.addListener('SnapcallCallStart', ()=>{}));
    this.subscription.push(DeviceEventEmitter.addListener('SnapcallStart', ()=>{}));

The subscription is stored to let you unregister event to avoid memory leaks.

  this.subscription[0].remove();

Personalize Call - the SnapcallParameter Class:

  var parameter = new SnapcallParameter();

  parameter.externalContext = null;     -> Context for the call you want to link - You will be able to get it on the other side of call via Snapcall API
  parameter.displayBrand = null;        -> name to display on call Screen
  parameter.displayName = null;         -> Second Name to display on call Screen
  parameter.callTitle = null;           -> title on top of Call UI

  parameter.urlImage = null;            -> url of image in snapcall UI
  parameter.textColor = "";             -> hex string which represent a color

  parameter.shouldReturn = false;       -> You have implemented a listener for call Event in ios so your user can continue the navigation in your app (for android the user can always retrieve the call via notification).
  parameter.AssetPathImage = null;      -> android asset image path or asset.xasset image String name in ios
  parameter.AssetPathFont = null;        -> android asset font path or asset.xasset font String name in ios
