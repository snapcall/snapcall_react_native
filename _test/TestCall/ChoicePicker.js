import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Button, Picker, ActionSheetIOS,
} from 'react-native';

let self;
const os = Platform.OS === 'ios';
let cb = null;
const choice = os ? ['cancel'] : [];
const labels = os ? ['cancel'] : [];
let i = 1;
function onChoice(value, label) {
  if (cb != null) cb(value, label);
}

function renderIOs(obj) {
  function ios_onPress() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: labels,
      cancelButtonIndex: 0,
    },
    (index) => {
      if (index === 0) { /* cancel action */ } else {
        console.log('state', labels[index]);
        self.setState({
          button: labels[index],

        });
      }
    });
  }
  return (<Button
    onPress={ios_onPress}
    title={self.state.button}
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
    />);
}

function renderAndroid() {
  const item = [];
  Object.keys(choice).forEach((key) => {
    const pickItem = (<Picker.Item label={labels[key]} value={choice[key]} />);
    item.push(choice[pickItem]);
  });
  // for (const el in choice) {
  //   const pickItem = (<Picker.Item label={labels[el]} value={choice[el]} />);
  //   item.push(pickItem);
  // }
  return (<Picker
    selectedValue={self.state.button}
    style={{ height: 50, width: 200 }}
    onValueChange={onChoice}
    enabled={true}
    >
    {item}
  </Picker>
  );
}

export default class ChoicePicker extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      button: props.def,
    };

    for (const el in props.myvalue) {
      if (props.myvalue[el].label && props.myvalue[el].value) {
        choice[i] = props.myvalue[el].value;
        labels[i] = props.myvalue[el].label;
        i++;
      }
    }
    console.log(props);
    cb = props.cb;

    return this;
  }

  render() {
    if (os) {
      return renderIOs();
    }
    return renderAndroid();
  }
}
