import React from 'react';
import { Button, ScrollView, Text, View } from "react-native";
import TestData from "./testdata";

const cookies = {
  "_MHYUUID": "9999f00d-ab12-123a-12a1-a0b1c2d3e4f5",
  "mi18nLang": "en-us",
  "account_id": "000012345",
  "cookie_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "ltoken": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "ltuid": "123456789"
}

const sim = 0;
const indexUrl = "https://act.hoyolab.com/bbs/event/signin-bh3/index.html?act_id=e202110291205111";
const infoUrl = "https://sg-public-api.hoyolab.com/event/mani/info?lang=en-us&act_id=e202110291205111";
const signUrl = "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111";

async function req(self:WebReq){
  const url = sim ? "http://192.168.0.15:3000/" : infoUrl;
  let res;
  try{
    res = await fetch(new Request(url, {
      method: "GET",
      headers: new Headers(TestData().getheaders)
    }));
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
    cookies._MHYUUID = TestData().cookie._MHYUUID;
    cookies.account_id = TestData().cookie.account_id;
    cookies.cookie_token = TestData().cookie.cookie_token;
    cookies.ltoken = TestData().cookie.ltoken;
    cookies.ltuid = TestData().cookie.ltuid;
    cookies.mi18nLang = TestData().cookie.mi18nLang;
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
