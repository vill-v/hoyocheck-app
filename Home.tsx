import { SafeAreaView, StatusBar } from "react-native";
import Account from "./Account";
import Status from "./Status";
import WebReq from "./webReq";
import React from "react";

interface Props{
  //implicitly passed from stack.Navigator
  navigation;
}
const Home = (props:Props) => {
    return (<SafeAreaView style={{
      height: "100%"
    }}>
      <StatusBar barStyle={'dark-content'} />
      <Account minimize={true} navigation={props.navigation}/>
      <Status/>
      <WebReq/>
    </SafeAreaView>);
}
export default Home;
