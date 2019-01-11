import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Picker,ActionSheetIOS} from 'react-native';

var picker;
let os = Platform.OS === "ios" ? true : false;
var cb  = null;
var choice = ['cancel'];
var labels = ['cancel'];
var i = 1;
function onChoice (value, label){

 if (cb != null)
  cb(value, label);

}


function renderIOs(obj){

    function ios_onPress (){
      ActionSheetIOS.showActionSheetWithOptions({
        options: labels,
        cancelButtonIndex: 0,
      },
      (index) => {
        if (index === 0) { /* cancel action */ }
        else {
          console.log("state", labels[index]);
          self.setState({
            button: labels[index]

          });

        }
    })}
  return (<Button
    onPress={ios_onPress}
    title={self.state.button}
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
    />)


}

function renderAndroid(obj){
  var item = [];
  for (var el in obj)
  {
    if (obj[el].label && obj[el].value){
      var pickItem = (<Picker.Item label={obj[el].label} value={obj[el].value} /> )
      item.push(pickItem);
    }
  }
  return ( <Picker
    selectedValue={def}
    style={{ height: 50, width:200 }}
    onValueChange={onChoice}
    enabled={true}
    >
    {item}
  </Picker>
  )

}
var self ;
export default class ChoicePicker extends Component {

    constructor(props){
      super(props)
      self = this;
      this.state = {
        button: props.def
      };

      for (var el in props.myvalue)
      {
        if (props.myvalue[el].label && props.myvalue[el].value){
          choice[i] = props.myvalue[el].value;
          labels[i] = props.myvalue[el].label;
          i++;
        }

      }
      console.log(props);
       cb = props.cb;

        return this;

    }

    render(){
      if (os) {
        return renderIOs();
      } else{
        return renderAndroid();
      }
    }

}
