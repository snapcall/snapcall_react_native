/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.log('start buildv05');
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Picker,
  Image,
} from 'react-native';
import { Snapcall, SnapcallParameter, VideoContainer } from 'react-native-snapcall';
import ChoicePicker from './ChoicePicker';

console.log('hello!', VideoContainer)
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let os = Platform.OS === 'ios' ? true : false;
const Props = {};
console.log('start buildv04');
const snapcall = new Snapcall();
const parameter = new SnapcallParameter();
parameter.video = true;
parameter.displayBrand = '@Snapcall';
parameter.displayName = 'Hello';
parameter.callTitle = 'TestCall';
parameter.androidResimage = 'images_img2snapcall';
parameter.showBackButton = true;
parameter.android_AssetPathFont = 'fonts/snapcallfont.otf';
parameter.iOS_AssetPathFont = 'Roboto-Thin';
parameter.iOS_AssetPathImage = 'infob';
parameter.externalContext = {
  fn: 'pierre',
  ln: 'reactnative',
  e: 'hello@snapcall.io',
  test: 'test react native',
  other: 'check',
};
// parameter.urlImage = "https://snapcall.io/assets/img/landing-transfertvoix.png";
parameter.textColor = '#FF0000';
parameter.backgroundColor = '#0000FF';
parameter.hideCart = true; // boolean to hide the cart in the call UI
parameter.shouldReturn = true;
// parameter.userInterfaceProperty.appLogo.url = "https://static.wixstatic.com/media/1f9c5d_b553ba0ec050464dbbd9bea215f10e94~mv2.png";
// parameter.userInterfaceProperty.userPortrait.filename = "ic_baseline_bedroom_baby_24";
parameter.userInterfaceProperty.userPortrait.path = "images/snapcall_icon_notif.png"
parameter.userInterfaceProperty.backgroundColor = "#FFFFFFFF"
parameter.userInterfaceProperty.iconColor = { background: "#FF131313", color: "#FFFFFFFF" };
// parameter.userInterfaceProperty.userPortrait.path = "images/snapcall_icon_notif.png"
// parameter.userInterfaceProperty.backgroundColor = "#FFFFFFFF"
// parameter.userInterfaceProperty.iconColor = { background: "#FF131313", color: "#FFFFFFFF" };
// parameter.userInterfaceProperty.userPortrait.package = "com.testcall2";
var bid = '88b3d0f3a44311e78f9b0ae03a1ae33f';
var bidZendesk = '0999b36e472111e997380ae222c5da84';
var pickA;


const textSpeakerOn = 'speaker On ';
const textSpeakerOff = 'speaker low';
const textMuteOn = 'unmute';
const textMuteOff = 'mute';

const colorInternetActif = '#00FF00';
const colorInternetNotActif = '#FF0000';
const colorInternetNoCall = '#841584';
const colorDefault = '#841584';
const colorActive = '#00FF00';
const colorUnActive = '#FF0000';

function createButton(onPress, title, color, style) {
  return (
    <Button
      onPress={onPress}
      title={title}
      color={color}
      style={style}
    ></Button>
  );
}

function checkIfBIDIsEnabled(bid, value, name) {
  snapcall
    .bidIsClosed(bid)
    .then((res) => {
      if (res != value) {
        console.error(`checkIfBIDIsEnabled ${name} return value is bad`);
      } else {
        console.log('call to is enabled correct');
      }
    })
    .catch(() => {
      console.log('failed to make request to check bid');
    });
}
// snapcall.activeDefaultInterface(false);
export default class App extends Component<Props> {
  state = {
    videolocal: false,
    videoremote: false,
    textState: 'no Call',
    textTimer: 'no Call',
    colorDefaultUI: colorActive,
    textSpeaker: textSpeakerOff,
    textMute: textMuteOff,
    backgroundColorInternetStatus: colorInternetNoCall,
    held: false,
    internet: true,
    uniqueValue: 0
  };

  onEvent(ev) {
    console.log(ev);
    if (!ev) return;
    let curentState = {
      internet: ev.connected,
      textSpeaker: ev.speaker ? textSpeakerOn : textSpeakerOff,
      textMute: ev.mute ? textMuteOn : textMuteOff,
    };
    if (ev.call) {
      curentState.textState = ev.call.callState;
      curentState.held = ev.call.held;
    }
    this.setState(curentState);
  }

  onConnectionReady(ev) {
    this.onEvent(ev);
  }
  onCreated(ev) {
    this.onEvent(ev);
  }
  onRinging(ev) {
    this.onEvent(ev);
  }
  onAnswer(ev) {
    this.onEvent(ev);
  }

  onHeld(ev) {
    this.onEvent(ev);
  }

  onError(parameter) {
    console.log("onError", parameter)
  }
  
  onAgentConnected(parameter) {
    console.log("onAgentConnected", parameter)
  }
  
  onMessage(parameter) {
    console.log("onMessage", parameter)
  }
  
  onUnhook(parameter) {
    console.log("onUnhook", parameter)
  }

  onUnheld(ev) {
    this.onEvent(ev);
  }

  onInternetDown(ev) {
    this.onEvent(ev);
  }

  onInternetUP(ev) {
    this.onEvent(ev);
  }

  onTime(ev) {
    // this.onEvent(ev);
    this.setTimer(ev.call.duration);
  }

  onSpeakerChange(ev) {
    this.onEvent(ev);
  }

  onMuteChange(ev) {
    this.onEvent(ev);
  }

  onremoteVideoInfo(ev) {
    this.setState({
      videoremote: ev.call.remoteVideoInfo.active,
    })
  }

  onLocalVideoInfo(ev) {
    this.setState({
      videolocal: ev.call.localVideoInfo.active,
    })
  }

  onUIRequest(ev) {}

  onHangup(e) {
    console.log('ontime', e);
    this.setState({
      textTimer: 'no Call',
      textState: 'no Call',
      textSpeaker: textSpeakerOff,
      textMute: textMuteOff,
    });
    snapcall.rateLastCall(4);
  }

  setTimer(val) {
    console.log('setTimer', val);
    if (val == -1) {
      this.setState({ textTimer: 'no Call' });
    } else {
      var min = Math.floor(val / 60);
      var sec = Math.floor(val % 60);
      this.setState({ textTimer: `${min}:${sec}` });
    }
  }

  connectAgent() {
    console.log('connecting pierre');
    snapcall.connectAgent('pierre@snapcall.io', parameter);
  }

  sendPartnerCall() {
    snapcall.sendPartnerCallInvitationWithToken(2, 'julien-chat@snapcall.io', PARTNER_TOKEN, "QRX5G65O63", parameter).then(()=> {
      snapcall.setNameLabelText("John Doe");
    });
  }


  constructor(Props) {
    checkIfBIDIsEnabled('88b3d0f3a44311e78f9b0ae03a1ae33f', false, 'pstn');
    checkIfBIDIsEnabled('0999b36e472111e997380ae222c5da84', false, 'queue');
    checkIfBIDIsEnabled('8b31014e606711e993320ae222c5da84', true, 'closed');
    checkIfBIDIsEnabled('bce3ace3606711e993320ae222c5da84', true, 'inactive');
    checkIfBIDIsEnabled('bce3ace3606711erandom20ae222c5da84', true, 'wrong');

    snapcall
      .askForPermission('voip', 'voip')
      .then((res) => {
        console.log(res);
        if (res == 'denied') console.log('permission refused');
        if (res == 'granted') console.log('permission succes');
      })
      .catch(() => {
        console.log('permission failed');
      });
    snapcall.setApiCredentials(APIKEY);
    console.log('construct');
    super(Props);

    snapcall.addEventListener('onTime', (ev) => { this.onTime(ev) });
    snapcall.addEventListener('onHangup', (ev) => { this.onHangup(ev) });
    snapcall.addEventListener('onMuteChange', (ev) => { this.onMuteChange(ev) });
    snapcall.addEventListener('onSpeakerChange', (ev) => { this.onSpeakerChange(ev) });
    snapcall.addEventListener('onHeld', (ev) => { this.onHeld(ev) });
    snapcall.addEventListener('onUnheld', (ev) => { this.onUnheld(ev) });
    snapcall.addEventListener('onConnectionReady', (ev) => { this.onConnectionReady(ev) });
    snapcall.addEventListener('onAnswer', (ev) => { this.onAnswer(ev) });
    snapcall.addEventListener('onRinging', (ev) => { this.onRinging(ev) });
    snapcall.addEventListener('onCreated', (ev) => { this.onUnheld(ev) });
    snapcall.addEventListener('onInternetUP', (ev) => { this.onInternetUP(ev) });
    snapcall.addEventListener('onInternetDown', (ev) => { this.onInternetDown(ev) });
    snapcall.addEventListener('onAgentConnected', (ev) => { this.onAgentConnected(ev) });
    snapcall.addEventListener('onError', (ev) => { this.onError(ev) });
    snapcall.addEventListener('onMessage', (ev) => { this.onMessage(ev) });
    snapcall.addEventListener('onUnhook', (ev) => { this.onUnhook(ev) });
    snapcall.addEventListener('onRemoteVideoInfo', (ev) => { this.onremoteVideoInfo(ev) });
    snapcall.addEventListener('onLocalVideoInfo', (ev) => { this.onLocalVideoInfo(ev) });
    snapcall.addEventListener('onCallActivityDestroy', (ev) => { console.log(ev) });
    snapcall.addEventListener('onCallActivityCreate', (ev) => { console.log(ev) });
    snapcall
      .getCurrentState()
      .then(this.onEvent.bind(this))
      .catch(() => {
        console.log('snapcall not started');
      });
      try {
        console.log("agent", snapcall.getConnectedAgent())
      } catch(e) {
          console.log("agent not connected");
      }
  }

  defaultUI = true;
  changeSnapcallUI() {
    this.defaultUI = !this.defaultUI;
    snapcall.activeDefaultInterface(this.defaultUI);
    this.setState({
      colorDefaultUI: this.defaultUI ? colorActive : this.colorUnActive,
    });
  }

  makeerror() {
    thie.hello.pl();
  }
  test() {}

  hangup() {
    snapcall.hangup().then(console.log).catch(console.log);
  }
  startVideo() {
    snapcall.startVideo()
  }

  render() {
    const call = createButton(this.launchcall, 'call', colorDefault, [
      appStyles.container,
    ]);
    const callzendesk = createButton(
      this.launchcallZendesk,
      'call zendesk',
      colorDefault,
      [appStyles.container]
    );
    const retrieve = createButton(
      snapcall.restorCallUI,
      'callUI',
      colorDefault,
      [appStyles.container]
    );
    const render = createButton(this.makeerror, 'reload', colorDefault, [
      appStyles.container,
    ]);
    const held = createButton(
      this.test,
      this.state.held ? 'held' : 'unheld',
      this.state.held ? colorUnActive : colorActive,
      [appStyles.container]
    );
    const internet = createButton(
      this.test,
      this.state.internet ? 'network on' : 'network off',
      this.state.internet ? colorActive : colorUnActive,
      [appStyles.container]
    );
    var snapcallController = (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {held}
          {internet}
          {createButton(() => this.startVideo(), "video", colorDefault, [
            appStyles.container,
          ])}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {createButton(snapcall.mute, this.state.textMute, colorDefault, [
            appStyles.container,
          ])}
          <Text> </Text>
          {createButton(this.hangup, 'hangup', colorDefault, [
            appStyles.container,
          ])}
          <Text> </Text>
          {createButton(
            snapcall.setSpeaker,
            this.state.textSpeaker,
            colorDefault,
            [appStyles.container]
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></View>
      </View>
    );

    var desactivateui = (
      <Button
        onPress={this.changeSnapcallUI}
        title="defaultUI"
        color={this.state.colorDefaultUI}
        style={[appStyles.container]}
        accessibilityLabel="Learn more about this purple button"
      />
    );

    var connectAgent = (
      <Button
        onPress={this.connectAgent}
        title="connect pierre"
        color={this.state.colorDefaultUI}
        style={[appStyles.container]}
        accessibilityLabel="Learn more about this purple button"
      />
    );
    var partnerConnect = (
      <Button
      onPress={this.sendPartnerCall}
      title="partner"
      color={this.state.colorDefaultUI}
      style={[appStyles.container]}
      accessibilityLabel="Learn more about this purple button"
    />
    );

    var disconnect = (
      <Button
      onPress={snapcall.disconnect}
      title="disconnect"
      color={this.state.colorDefaultUI}
      style={[appStyles.container]}
      accessibilityLabel="Learn more about this purple button"
    />
    );
    
    return (
      <View style={styles.container}>
        { this.state.videolocal && <VideoContainer style={styles.localVideo} videosrc='local'></VideoContainer>}
        { this.state.videoremote && <VideoContainer style={styles.remotevideo} videosrc='remote'></VideoContainer>}
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('./images/imgtest.png')}
            style={{ width: 50, height: 50 }}
          ></Image>
          {desactivateui}
        </View>

        {render}
        {connectAgent}{partnerConnect}{disconnect}
        {call}
        <Text>{'\n'}</Text>
        {callzendesk}
        <Text>{'\n'}</Text>
        {retrieve}
        <Text>{'\n'}</Text>
        <Text style={styles.welcome}>Parameter</Text>
        <Text style={styles.instructions}>Bid</Text>
        <ChoicePicker
          myvalue={[
            { value: '88b3d0f3a44311e78f9b0ae03a1ae33f', label: 'Pierre' },
            { value: 'null', label: 'none' },
          ]}
          def={'pierre'}
          cb={null}
        ></ChoicePicker>
        <Text> {this.state.textTimer} </Text>
        {snapcallController}
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
    console.log("call zendesk")
    snapcall.launchCallBid(bidZendesk, parameter);
  }
}

const appStyles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#841584',
  },
});

const VideoStyles = StyleSheet.create({

});

const styles = StyleSheet.create({
  remotevideo: {
    width: 100,
    height: 100,
    // backgroundColor: "#FF0000",
    position: "absolute",
    top: 0,
    left:0,
  },
  localVideo: {
    width: 100,
    height: 100,
    // backgroundColor: "#00FF00",
    position: "absolute",
    top: 0,
    right:0,
  },
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
