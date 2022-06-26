import React from 'react';
import { Button, Text, View } from "react-native";

export default class WebReq extends React.Component{
  declare state: {
    hello:string
  };
  constructor(props) {
    super(props);
    this.state= {hello:"hello"};
  };
  render() {
    return (<View>
      <Button title={"hello world"} onPress={() => this.setState({"hello":"world"})}/>
      <Text>this.state= {this.state.hello}</Text>
    </View>);
  }
};
