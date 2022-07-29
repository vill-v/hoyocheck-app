import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from "react-native";

import WebReq from "./webReq";
import Account from "./Account";
import Status from "./Status";

export default class App extends React.Component {
  declare state:{
    accounts:any[],
    activeAccount:null,
    lastResult:MihoyoCheckInResult|null
  }
  constructor(props) {
    super(props);
    this.state = {
      accounts:[],
      activeAccount:null,
      lastResult:null
    };
  }
  setAccounts(e){this.setState({ "accounts": e })}
  setActiveAccount(e){this.setState({ "activeAccount": e })}
  setLastResult(e){this.setState({ "lastResult": e })}
  render() {
    return (
      <SafeAreaView style={{
        height: "100%"
      }}>
        <StatusBar barStyle={'dark-content'} />
        <Account minimize={true} setAccounts={this.setAccounts.bind(this)}
                 setActive={this.setActiveAccount.bind(this)}/>
        <Status checkin={this.state.lastResult}/>
        <WebReq setLastResult={this.setLastResult.bind(this)}
                currentAccount={this.state.activeAccount}/>
      </SafeAreaView>
    );
  }
}
