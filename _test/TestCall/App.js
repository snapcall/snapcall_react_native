/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Picker} from 'react-native';
import {Snapcall, SnapcallParameter} from 'react-native-snapcall';
import ChoicePicker from './ChoicePicker';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let os = Platform.OS === "ios" ? true : false;
type Props = {};
  const snapcall = new Snapcall();
  this.eventListener = {"onUIEnd" : [], "onCallEnd" :  [], "onUIStart" : [], "onError" : [], "onStart" : [], "onTime" : [], "onCallStart":[], "onEnd" : [] };

  snapcall.addEventListener("onUIEnd", (e)=>{console.log("Snapcall_onuiend", e)})
  snapcall.addEventListener("onUIStart", (e)=>{console.log("Snapcall_onUistart", e)})

  snapcall.addEventListener("onCallEnd", (e)=>{console.log("Snapcall_onCallEnd", e)})
  snapcall.addEventListener("onCallStart", (e)=>{console.log("Snapcall_onCallStart", e)})

  snapcall.addEventListener("onTime", (e)=>{console.log("Snapcall_onTime", e)})
  snapcall.addEventListener("onError", (e)=>{console.log("Snapcall_onError", e)})

  snapcall.addEventListener("onStart", (e)=>{console.log("Snapcall_onStart", e)})
  snapcall.addEventListener("onEnd", (e)=>{console.log("Snapcall_onEnd", e)})
  const parameter = new SnapcallParameter();


  parameter.displayBrand = "@Snapcall";
  parameter.displayName = "Hello";
  parameter.callTitle = "TestCall";
  parameter.android_AssetPathImage = "images/infob.png";
  parameter.android_AssetPathFont = "fonts/snapcallfont.otf";
  parameter.iOS_AssetPathImage = "infob";
  parameter.iOS_AssetPathFont = "Roboto-Thin";

  parameter.externalContext = {"Hello" : "snapcall"};
  // parameter.urlImage = "https://snapcall.io/assets/img/landing-transfertvoix.png";
  parameter.textColor = "#00FF00";
  parameter.backgroundColor = '#0000FF';
  parameter.hideCart = true;           // boolean to hide the cart in the call UI
  parameter.shouldReturn = true;
  var bid = "88b3d0f3a44311e78f9b0ae03a1ae33f";
  var pickA;
export default class App extends Component<Props> {

  constructor (Props) {
    console.log("construct");
    super(Props);
    // pickA = new ChoicePicker(this, [{value : "88b3d0f3a44311e78f9b0ae03a1ae33f", label: "Pierre"},{value : "null", label: "none"} ], "pierre", null);



  }
  makeerror(){
    thie.hello.pl();
  }
  render() {
    console.log("render is called now");
    snapcall.askForPermission("voip", "voip");
    var call = (  <Button
      onPress={this.launchcall}
      title="call"
      color="#841584"
      style={[appStyles.container]}
      accessibilityLabel="Learn more about this purple button"
      />
    )
    var retrieve = (  <Button
      onPress={snapcall.restorCallUI}
      title="callUI"
      color="#841584"
      style={[appStyles.container]}
      accessibilityLabel="Learn more about this purple button"
      />
    )

    var render = (  <Button
      onPress={this.makeerror}
      title="reload"
      color="#841584"
      style={[appStyles.container]}
      accessibilityLabel="Learn more about this purple button"
      />
    )
    return (
      <View style={styles.container}>
        {render}
        <Text >{"\n"}</Text>
        {call}
        <Text >{"\n"}</Text>
        {retrieve}
        <Text >{"\n"}</Text>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Text style={styles.welcome}>Parameter</Text>
        <Text style={styles.instructions}>Bid</Text>
        <ChoicePicker
         myvalue={[{value : "88b3d0f3a44311e78f9b0ae03a1ae33f", label: "Pierre"},{value : "null", label: "none"} ]}
         def={"pierre"}
         cb={null}>
        </ChoicePicker>
      </View>
    );
  }

  /**
    basic launch call from a button
  **/
  configure() {

  }
  launchcall () {

    snapcall.launchCallBid(bid, parameter);
  }
}

const appStyles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#841584',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
