import React from 'react';
import { Button, ScrollView, Text, View } from "react-native";

async function req(self:WebReq){
  const url = "http://192.168.0.15:3000/";
  let res;
  try{
    res = await fetch(new Request(url));
    self.setState({"hello":await res.text()});
  }
  catch (e) {
    console.log("errrrr", (e as Error).name, (e as Error).message, (e as Error).stack);
  }
  finally {
    console.log("res", res);
  }
}

export default class WebReq extends React.Component{
  declare state: {
    hello:string
  };
  constructor(props) {
    super(props);
    this.state= {hello:"hello"};
  };
  render() {
    return (<ScrollView style={{
      flex:1,
      borderWidth: 5,
      borderColor: "#5ACB33",
    }}>
      <Button title={"hello world"} onPress={() => req(this) && this.setState({"hello":"world"})}/>
      <Text>this.state= {this.state.hello}</Text>
    </ScrollView>);
  }
};
