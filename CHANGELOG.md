# CHANGELOG


## Next Version
## 2.2.2
- snapcall sdk update
## 2.2.1
- fix wrong null check on iconColor in android (https://github.com/snapcall/snapcall_react_native/pull/51)
## 2.2.0
- inactive button color and alpha color for ios.
- update ios sdk to 5.10.1 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.10.1) 
- update android sdk to 2.10.0 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.10.0)

## 2.1.0-beta.16
- update ios sdk to 5.9.2 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.9.3)
## 2.1.0-beta.15
- update ios sdk to 5.9.2 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.9.2)

## 2.1.0-beta.14
- uniform error message for partner
- update ios sdk to 5.9.1 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.9.1)
- update android sdk to 2.9.2 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.9.2)

## 2.1.0-beta.13
- update ios sdk to 5.9.0 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.9.0)

## 2.1.0-beta.12
- review parameter send to native
- add hangup icons color - back and hide background color
- update android sdk to 2.9.1 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.9.1)
- update ios sdk to 5.8.3 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.8.2, (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.8.3)
## 2.1.0-beta.11
- update ios sdk to 5.8.1 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.8.1)
## 2.1.0-beta.10
- adapt to video display change in sdk. #46
- update android sdk to 2.9.0 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.9.0)
- update ios sdk to 5.8.0 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.8.0)

## 2.1.0-beta.9
- update android sdk to 2.8.2 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.8.2)

## 2.1.0-beta.8
- update ios sdk to 5.7.2 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.7.2)

## 2.1.0-beta.7
- add ios partner agent and video call.
- update ios sdk to 5.7.1 (https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.7.1 - https://github.com/snapcall/snapcall_sdk_ios/releases/tag/5.7.0)
- update android sdk to 2.8.1 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.8.1)

## 2.1.0-beta.6

- android api function updateUI (reload default user interface)
- android event parameter event.call.callID , unique id of a call in snapcall
- Update android sdk to 2.8.0 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.8.0)

## 2.1.0-beta.5

- fix removeEventListener

## 2.1.0-beta.4

- fix `package.json` for npm release

## 2.1.0-beta.3

- event `onLocalVideoInfo`, `onCallActivityDestroy`, `onCallActivityCreate`
- android Video View React bridge and video api
- android Partner agent connection with access token
- Update android sdk to 2.7.0 (https://github.com/snapcall/snapcall_sdk_android/releases/tag/2.7.0)

## 2.1.0-beta.2

-  release snapcall return a promise #37

## 2.1.0-beta.1

- ios: arm64 simulator build
- android: agent connection event fixed
- android: customisation of notification

## 2.1.0-beta.0

- android Agent.
- android partner connection.
- android video support.

## 2.0.1
- fixed a bug that prevent to compile when calling swift from objective c for a simulator. 

## 2.0.0
- update ios and android snapcall lib to latest
- snapcall for react native >  0.60

## 1.2.2
- update to react native 0.60 , introducing auto link, androidX, and cocoapod by default
- update android native sdk

## 1.2.1
## 1.2.0
- add a return button on android if necessary.
- You can now build your own User interface in react-native for a snapcall call.
- update ios and android to latest snapcall release.

## 1.1.1
- jcenter repository put at the end of build.graddle (conflict with google). see [issues](https://github.com/react-native-community/react-native-camera/issues/1875) in rn community

# 1.1.0
- externalContext is now a json object
- context in zendesk format

# 1.0.0
- testApp with all parameter
- eventName formated
- BackgroundColor
- bugfix ios event listener
- Readme updated
- App Test in _test/ directory
- clarify and comment  code
- remove duplicate name

## 0.1.0
- ios bridge
- android bridge
- pre javascript function for easy use
- Add CHANGELOG.md
