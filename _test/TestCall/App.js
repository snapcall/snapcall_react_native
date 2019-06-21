/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.log("start buildv05");
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Picker, Image} from 'react-native';
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

  console.log("start buildv04");
  const snapcall = new Snapcall();
  const parameter = new SnapcallParameter();
  parameter.displayBrand = "@Snapcall";
  parameter.displayName = "Hello";
  parameter.callTitle = "TestCall";
  parameter.androidResimage = "images_img2snapcall";
  parameter.showBackButton = true;
  parameter.android_AssetPathFont = "fonts/snapcallfont.otf";
  parameter.iOS_AssetPathFont = "Roboto-Thin";
  parameter.iOS_AssetPathImage = "infob";

  parameter.externalContext = {
    fn :"pierre",
    ln : "reactnative",
    e : "hello@snapcall.io",
    test : "test react native",
    other : "check"

  };
  // parameter.urlImage = "https://snapcall.io/assets/img/landing-transfertvoix.png";
  parameter.textColor = "#00FF00";
  parameter.backgroundColor = '#0000FF';
  parameter.hideCart = true;           // boolean to hide the cart in the call UI
  parameter.shouldReturn = true;

  var bid = "88b3d0f3a44311e78f9b0ae03a1ae33f";
  var bidZendesk = "0999b36e472111e997380ae222c5da84";
  var pickA;

  const textSpeakerOn = "speaker On"
  const textSpeakerOff = "speaker low"
  const textMuteOn = "unmute"
  const textMuteOff = "mute"

  const colorInternetActif = "#00FF00"
  const colorInternetNotActif = "#FF0000"
  const colorInternetNoCall = "#841584"
  const colorDefault = "#841584"
  const colorActive = "#00FF00"
  const colorUnActive = "#FF0000"

function createButton(onPress, title, color, style) {
  return (
    <Button
      onPress={onPress}
      title={title}
      color={color}
      style={style}>
    </Button>
  );
}

function checkIfBIDIsEnabled(bid, value, name) {
  snapcall.bidIsClosed(bid).then((res)=> {
    if (res != value)
    {
      console.error(`checkIfBIDIsEnabled ${name} return value is bad`);
    }else{
      console.log("call to is enabled correct");
    }
    }).catch(()=>{
      console.log('failed to make request to check bid');
      })
}


export default class App extends Component<Props> {

  state = {
    textState: "no Call",
    textTimer: "no Call",
    colorDefaultUI : colorActive,
    textSpeaker:  textSpeakerOff,
    textMute: textMuteOff,
    backgroundColorInternetStatus : colorInternetNoCall,
    held : false,
    internet : true
  }

  onEvent(ev) {
    console.log(ev);
    if (!ev) return;
      let curentState = {
        internet: ev.connected,
        textSpeaker: ev.speaker ? textSpeakerOn: textSpeakerOff,
        textMute: ev.mute ? textMuteOn: textMuteOff,
      }
      if (ev.call) {
        curentState.textState=ev.call.callState;
        curentState.held= ev.call.held;
      }
      this.setState(curentState)
  }

  onConnectionReady(ev){
    this.onEvent(ev)
  }
  onCreated(ev){
    this.onEvent(ev)
  }
  onRinging(ev){
    this.onEvent(ev)
  }
  onAnswer(ev){
    this.onEvent(ev)
  }

  onHeld(ev) {
    this.onEvent(ev)
  }

  onUnheld(ev) {
    this.onEvent(ev)
  }

  onInternetDown(ev){
    this.onEvent(ev)
  }

  onInternetUP(ev){
    this.onEvent(ev)
  }

  onTime (ev) {
    console.log("ontime app" , ev);
    this.onEvent(ev)
    this.setTimer(ev.call.duration)
  }

  onSpeakerChange(ev) {
    this.onEvent(ev)
  }

  onMuteChange(ev) {
    this.onEvent(ev)
  }

  onUIRequest(ev){
    
  }

  onHangup (e) {

    console.log("ontime" , e);
    this.setState({textTimer: "no Call",
    textState: "no Call",
    textSpeaker: textSpeakerOff,
    textMute: textMuteOff,
    })
    snapcall.rateLastCall(4);
  }

  setTimer(val) {
    console.log("setTimer", val)
    if (val == -1)
    {
       this.setState({textTimer: "no Call"})
    }
    else {
      var min = Math.floor(val / 60);
      var sec =  Math.floor(val % 60);
      this.setState({textTimer: `${min}:${sec}`});
    }
  }

  constructor (Props) {

    checkIfBIDIsEnabled("88b3d0f3a44311e78f9b0ae03a1ae33f", false, "pstn");
    checkIfBIDIsEnabled("0999b36e472111e997380ae222c5da84", false, "queue");
    checkIfBIDIsEnabled("8b31014e606711e993320ae222c5da84", true, "closed");
    checkIfBIDIsEnabled("bce3ace3606711e993320ae222c5da84", true, "inactive");
    checkIfBIDIsEnabled("bce3ace3606711erandom20ae222c5da84", true, "wrong");

    snapcall.askForPermission("voip", "voip");
    console.log("construct");
    super(Props);
    this.setTimer = this.setTimer.bind(this);
    this.onTime = this.onTime.bind(this);
    this.changeSnapcallUI = this.changeSnapcallUI.bind(this);
    this.onHangup = this.onHangup.bind(this);
    this.onSpeakerChange = this.onSpeakerChange.bind(this);
    this.onMuteChange = this.onMuteChange.bind(this);
    this.onConnectionReady = this.onConnectionReady.bind(this);
    this.onRinging = this.onMuteChange.bind(this);
    this.onAnswer = this.onMuteChange.bind(this);
    this.onHeld = this.onMuteChange.bind(this);
    this.onUnheld = this.onMuteChange.bind(this);
    this.onInternetUP = this.onMuteChange.bind(this);
    this.onInternetDown = this.onMuteChange.bind(this);
    this.onUIRequest = this.onUIRequest.bind(this);
    this.render=this.render.bind(this);

    snapcall.addEventListener("onTime", this.onTime);
    snapcall.addEventListener("onHangup", this.onHangup);
    snapcall.addEventListener("onMuteChange", this.onMuteChange);
    snapcall.addEventListener("onSpeakerChange", this.onSpeakerChange);
    snapcall.addEventListener("onHeld", this.onHeld);
    snapcall.addEventListener("onUnheld", this.onUnheld);
    snapcall.addEventListener("onConnectionReady", this.onConnectionReady);
    snapcall.addEventListener("onAnswer", this.onAnswer);
    snapcall.addEventListener("onRinging", this.onUnheld);
    snapcall.addEventListener("onCreated", this.onUnheld);
    snapcall.addEventListener("onInternetUP", this.onInternetUP);
    snapcall.addEventListener("onInternetDown", this.onInternetDown);
    snapcall.getCurrentState().then(this.onEvent.bind(this)).catch(()=>{console.log("snapcall not started")});
  }

  defaultUI = true
  changeSnapcallUI() {
    this.defaultUI = !this.defaultUI;
    snapcall.activeDefaultInterface(this.defaultUI);
    this.setState({colorDefaultUI: this.defaultUI? colorActive : this.colorUnActive})
  }

  makeerror() {
    thie.hello.pl();
  }
  test() {

  }

  hangup() {
    snapcall.hangup().then(console.log).catch(console.log);
  }

  render() {
    const call = createButton(this.launchcall, "call", colorDefault, [appStyles.container]);
    const callzendesk = createButton(this.launchcallZendesk, "call zendesk", colorDefault, [appStyles.container]);
    const retrieve = createButton(snapcall.restorCallUI,"callUI",colorDefault, [appStyles.container]);
    const render = createButton(this.makeerror, "reload", colorDefault, [appStyles.container]);
    const held = createButton(this.test, this.state.held ? "held": "unheld", this.state.held ? colorUnActive : colorActive, [appStyles.container]);
    const internet = createButton(this.test, this.state.internet ? "network on": "network off", this.state.internet ? colorActive : colorUnActive, [appStyles.container]);
    var snapcallController = (
      <View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      {held}{internet}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      {createButton(snapcall.mute, this.state.textMute, colorDefault, [appStyles.container])}
      <Text>{" "}</Text>
      {createButton(this.hangup, "hangup", colorDefault, [appStyles.container])}
      <Text>{" "}</Text>
      {createButton(snapcall.setSpeaker, this.state.textSpeaker, colorDefault, [appStyles.container])}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      </View>
      </View>
    )


    var desactivateui = (<Button
      onPress={this.changeSnapcallUI}
      title="defaultUI"
      color= {this.state.colorDefaultUI}
      style={[appStyles.container]}
      accessibilityLabel="Learn more about this purple button"
      />
    )
    return (
      <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image source={  require('./images/imgtest.png')} style={{width:50, height:50}} ></Image>
        {desactivateui}
      </View>

        {render}
        <Text>{"\n"}</Text>
        {call}
        <Text>{"\n"}</Text>
        {callzendesk}
        <Text>{"\n"}</Text>
        {retrieve}
        <Text>{"\n"}</Text>
        <Text style={styles.welcome}>Parameter</Text>
        <Text style={styles.instructions}>Bid</Text>
        <ChoicePicker
         myvalue={[{value : "88b3d0f3a44311e78f9b0ae03a1ae33f", label: "Pierre"},{value : "null", label: "none"} ]}
         def={"pierre"}
         cb={null}>
        </ChoicePicker>
        <Text> {this.state.textTimer} </Text>
        { snapcallController }
        <Text>{this.state.textState}</Text>
      </View>
    );
  }

  /**
    basic launch call from a button
  */
  launchcall() {

    snapcall.launchCallBid(bid, parameter);
  }

  launchcallZendesk() {

    snapcall.launchCallBid(bidZendesk, parameter);
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
