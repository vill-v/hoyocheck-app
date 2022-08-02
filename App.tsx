import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import {mainContext} from "./mainContext";
import AccountInput from "./AccountInput";

const stack = createNativeStackNavigator();


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
      <mainContext.Provider value={{...this.state,
        setAccounts:this.setAccounts.bind(this),
        setActiveAccount:this.setActiveAccount.bind(this),
        setLastResult:this.setLastResult.bind(this),
      }}>
        <NavigationContainer>
          <stack.Navigator>
            <stack.Screen name={"Home"} component={Home}/>
            <stack.Screen name={"Add Account"} component={AccountInput}/>
          </stack.Navigator>
        </NavigationContainer>
      </mainContext.Provider>
    );
  }
}
