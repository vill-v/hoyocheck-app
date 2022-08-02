import React from 'react';
import { Button, ScrollView, Text, View } from "react-native";
import TestData from "./testdata";
import {mainContext} from "./mainContext";

const sim = 1;
const INDEX_URL = sim ? "http://192.168.0.15:3000/" : "https://act.hoyolab.com/bbs/event/signin-bh3/index.html?act_id=e202110291205111";
const INFO_URL = sim ? "http://192.168.0.15:3000/info" : "https://sg-public-api.hoyolab.com/event/mani/info?lang=en-us&act_id=e202110291205111";
const SIGN_URL = sim ? "http://192.168.0.15:3000/sign" : "https://sg-public-api.hoyolab.com/event/mani/sign";
const Debug = {log:console.log.bind(console)}

let currentCookie = "";

function formatCookie(cookie:AccountCookie):string{
  return Object.keys(cookie)
    .map(k=>`${k}=${cookie[k]}`)
    .join("; ");
}

async function req(self, currentAccount, setLastResult){
  currentCookie = formatCookie(currentAccount.cookie);
  let res;
  try{
    res = await checkin(false);
    self.setState({"hello":JSON.stringify(res)});
    setLastResult(res);
  }
  catch (e) {
    console.log("errrrr", (e as Error).name, (e as Error).message, (e as Error).stack);
  }
  finally {
    console.log("res", res);
  }
}

async function checkin(signInExecuted?:boolean):Promise<CheckInResult>{
  const headers = new Headers(TestData().getheaders);
  //todo "Cookie" is a forbidden header in the standard, but works fine here; confirm behavior
  headers.set("Cookie", currentCookie);
  const info:MihoyoInfo = await fetch(new Request(INFO_URL, {
    method: "GET",
    headers: headers
  }))
    .then(function (response:Response) {
      Debug.log("info","fetch-info",[response.status, response.type, response.headers]);
    	return response;
    })
    .then(e=>e.json())
    .catch(e=>Debug.log("err","fetch-info",e));
  const data = readMihoyoInfo(info);
  if(data === null || data.first_bind){
    // ask user to check in manually
    Debug.log("warn","fetch-info",["checkin terminated early", data]);
    return Promise.resolve({
      success: false,
      checkinAttempted: false,
      result: null
    });
  }
  if(!data.is_sign) {
    if(signInExecuted){
      Debug.log("err","checkin",["POST attempted but is_sign did not change", data]);
      return Promise.resolve({
        success: false,
        checkinAttempted: true,
        result: info
      });
    }
    else {
      await doSignIn();
      return checkin(true);
    }
  }
  // appStatus.nextRun = setupNextAlarm();
  return Promise.resolve({
    success: data.is_sign,
    checkinAttempted: !!signInExecuted,
    result: info
  });
}

function readMihoyoInfo(info:MihoyoInfo):MihoyoCheckInData {
  if(info?.retcode === undefined ||
    info?.message === undefined ||
    info?.data === undefined
  ){
    Debug.log("err","fetch-info",["malformed MihoyoInfo object", info]);
    return null;
  }
  if(info.retcode === -100){
    Debug.log("err","fetch-info",["code -100 not logged in", info]);
    return null;
  }
  else if(info.retcode === 0){
    const data = info.data;
    if(!data ||
      !Object.prototype.hasOwnProperty.call(data, "total_sign_day") ||
      !Object.prototype.hasOwnProperty.call(data, "today") ||
      !Object.prototype.hasOwnProperty.call(data, "is_sign") ||
      !Object.prototype.hasOwnProperty.call(data, "first_bind")
    ){
      Debug.log("err","fetch-info",["malformed MihoyoCheckInData object", data]);
      return null;
    }
    return data;
  }
  else{
    Debug.log("err","fetch-info",["unexpected ret code in readMihoyoInfo", info]);
  }
  return null;
}

async function doSignIn(){
  Debug.log("info","fetch-sign","attempting POST request");
  // appStatus.lastCheckin = Date.now();

  const headers = new Headers(TestData().getheaders);
  headers.set("Cookie", currentCookie);

  const options:RequestInit = {
    method: "POST",
    headers: headers,
    body: `{"act_id":"e202110291205111"}`
  }
  const result:MihoyoCheckInResult = await fetch(SIGN_URL, options)
    .then(function (response:Response) {
      Debug.log("info","fetch-sign",[response.status, response.type, response.headers]);
      return response;
    })
    .then(e=>e.json())
    .catch(e=>Debug.log("err","fetch-sign",e));
  if(!result ||
    !Object.prototype.hasOwnProperty.call(result, "retcode") ||
    !Object.prototype.hasOwnProperty.call(result, "message") ||
    !Object.prototype.hasOwnProperty.call(result, "data")
  ){
    Debug.log("err","fetch-sign",["malformed CheckInResult object", result]);
    return;
  }
  if(result.retcode === 0){
    Debug.log("info","fetch-sign","successfully checked in!");
  }
  else if(result.retcode === -5003){
    Debug.log("info","fetch-sign","already checked in today (-5003)");
  }
  else {
    Debug.log("err","fetch-sign",["unexpected ret code in doSignIn", result]);
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
      flexBasis: 100,
      flexGrow: 1,
      flexShrink: 0,
      borderWidth: 1,
      borderColor: "#5ACB33",
    }}>
      <mainContext.Consumer>
        {({activeAccount, setLastResult}) => (
          <Button title={"hello world"} onPress={() => req(this, activeAccount, setLastResult) && this.setState({"hello":"world"})}/>
          )}
      </mainContext.Consumer>
      <Text>this.state= {this.state.hello}</Text>
    </ScrollView>);
  }
};
