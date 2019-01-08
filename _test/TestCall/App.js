/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {Snapcall, SnapcallParameter} from 'react-native-snapcall';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
  const snapcall = new Snapcall();
  const parameter = new SnapcallParameter();
export default class App extends Component<Props> {

  constructor (Props) {
    super(Props);

    snapcall.addEventListener("SnapcallError", (e)=>{console.log("Snapcall_error", e)})
    snapcall.addEventListener("SnapcallUIStart", (e)=>{console.log("SnapcallUIStart", e)})
    snapcall.addEventListener("SnapcallCallStart", (e)=>{console.log("SnapcallCallStart", e)})
    snapcall.addEventListener("SnapcallCallEnd", (e)=>{console.log("SnapcallCallEnd", e)})
    snapcall.addEventListener("SnapcallTime", (e)=>{console.log("SnapcallTime", e)})


  }
  render() {
    snapcall.askForPermission("voip", "voip");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
        onPress={this.launchcall}
        title="callus"
        color="#841584"
        style={[appStyles.container]}
        accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
  launchcall () {
    snapcall.launchCallBid("88b3d0f3a44311e78f9b0ae03a1ae33f", parameter);
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
