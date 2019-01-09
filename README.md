# Snapcall React-Native Library

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
IOs :
  - fonctional IOs version is 10, can compile up to 8

Created with react-native version 0.55.4 on MacOs.
Android sdk created with Android Studio 3.1.3 .
IOs sdk created with Xcode 9.3.1 .

currently tested on :
Xcode 10
android studio 3.1.3
react-native 0.57.8

## Import ##

In your package.json add Snapcall dependencies :
  "react-native-snapcall": "url"

Run `npm install react-native-snapcall` to install .
Run `react-native link react-native-snapcall` to import the native part.

### IOs only

Snapcall Swift framework come with cocoapod

  pod 'Snapcall_Framework', :git => 'https://snapcall:Snapcall1234@bitbucket.org/seampl/framework_snapcall_ios.git',:tag => '5.1.0'

add plist entries :

- Privacy - Microphone Usage Description for capture permission
- Privacy - Camera Usage Description for video permission. Some part of snapcall framework symbol use apple video api. To avoid to be rejected by apple application store add this entries either you don't use video.
- Required background modes : App provides Voice over IP services

  Bitcode must be set to no.

### Android

if you get this error :
	'Only Jar-type local dependencies are supported.'
your android gradle version is to old and don't support aar files, you will need to update it.

```
buildscript {
  repositories {
      jcenter()
      maven {
          url 'https://maven.google.com'
      }
  }
  dependencies {
      classpath 'com.android.tools.build:gradle:3.1.3'
      // NOTE: Do not place your application dependencies here; they belong
      // in the individual module build.gradle files
  }
}
```

## Use ##

In the next part bid is the Button identifier from snapcall, it's the identifier which identify your account and the place you want to call.
In  your javascript file :

### import :
  import {Snapcall, SnapcallParameter} from 'react-native-snapcall';

### Make a call

```  
  var snapcall = new Snapcall();
  snapcall.askForPermission('Androidreason', 'Androidmessage')
  var parameter = new SnapcallParameter();
  function onPressCallButton() {snapcall.launchCallBid("bid", parameter)};
  ```

### Check for button availability :

```
  snapcall.bidIsClosed(bid, (res)=>{
    if (!res)
    {
      showCallButton();
    }
    })
```

### Get Audio Permission :

For android Permission are mandatory before to launch the call therefore the library will throw an error.
iOS will ask automatically if not granted.

```
  snapcall.askForPermission(Androidreason, Androidmessage)
```



### Release snapcall ressource :

The snapcall main native class when instanced keep a reference on herself. If you want to release it call this function.

```
  Snapcall.releaseSnapcall()
```

### Restor UI of call during a snapCall Call

When a call is started and your user navigate in the app you can place Call ui on front.

```
  Snapcall.restorCallUI()
```

### Follow the Snapcall call Event :
To monitor if a call is processing you can add event listener  
  ```
 snapcall.addEventListener(eventName, _function)
```
event list :
- SnapcallUIEnd
- SnapcallCallEnd
- SnapcallUIStart
- SnapcallError
- SnapcallCallStart
- SnapcallTime

## Customize Call

### the SnapcallParameter Class:

```
  var parameter = new SnapcallParameter();
  parameter.externalContext = null;     // Context for the call you want to link - You will be able to get it via SnapCall API
  parameter.displayBrand = null;        // name to display on call Screen
  parameter.displayName = null;         // Second Name to display on call Screen
  parameter.callTitle = null;           // title on top of Call UI

  parameter.urlImage = null;            // url of image in snapcall UI
  parameter.textColor = "";             // hex string which represent a color

  parameter.shouldReturn = false;       // You have implemented a listener for call Event in IOs, your user can continue the navigation in your app (for android the user can always retrieve the call via notification).
  parameter.AssetPathImage = null;      // android asset image path or asset.xasset image String name for IOs
  parameter.AssetPathFont = null;       //  android asset font path or asset.xasset font String name for IOs

```
### Static parameter

  For IOs you can set some static variable for callkit in your appDelegate in objectiveC:
```
  -(void)setSnapcallStaticWithAppName:
  (NSString*)appName
  ringtone:(NSString*)ringToneSoung
  iconTemplate:(NSData*)icon
```


## TEST App

In the _test repository you can find a sample app.
To test android studio and xcode are needed, also yarn/npm ,cocoapod(ruby), node, and of course react-native(cli - link)
I use yarn because by adding library by path npm to symlink and the RN cli sims to not handle it.
If you use yarn after Adding the module remove the _test directory from /node_module/react-native-snapcall.

yarn install
cd iOS && pod install && cd ..
react-native link
open -a xcode ios/TestCall.xcworkplace
open -a 'android studio' android/
react-native start
