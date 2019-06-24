import React, {Component} from 'react';
import {Snapcall, SnapcallParameter} from 'react-native-snapcall';


function getButtonColor(state) {

    if (state.validated === null)
      return '#616161';
    if (state.validated === false)
      return '#db9d20'
    if (state.validated === true)
      return '#61FF61'

}

export default class SnapcallBtn extends Component {

  btnbid = null;

  title = null

  state = {
    validated: null,
    neededButtonStatus: null,
  }

  construct(props) {

    if (!props || !props.btnbid || !props.title)
       throw new Error('my error');
    this.btnbid = props.btnbid;
    if (props.buttonStatus)
      state.neededButtonStatus= props.buttonStatus
    this.title = props.title
  }

  render() {
    return (<Button
      onPress={ios_onPress}
      title={self.state.button}
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
      />);
  }


    click() {

    }

}
