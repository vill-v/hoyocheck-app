import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import TestData from "./testdata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {mainContext} from "./mainContext";

const testAcc1 = {
  name: "Conductor Vill-V",
  cookie: TestData().cookie,
  honkai: true,
  genshin: false
}
const testAcc2 = {
  name: "The Great Magician Vill-V",
  cookie: TestData().cookie,
  honkai: true,
  genshin: false
}
const testAcc3 = {
  name: "The \"Expert\" Vill-V",
  cookie: TestData().cookie,
  honkai: true,
  genshin: false
}
const testAcc4 = {
  name: "Vill-V Looking Down Upon the Stars",
  cookie: TestData().cookie,
  honkai: false,
  genshin: false
}
const testAcc5 = {
  name: "Flavorful Vill-V",
  cookie: TestData().cookie,
  honkai: false,
  genshin: false
}
const testAcc6 = {
  name: "\"Pure Evil\" Vill-V",
  cookie: TestData().cookie,
  honkai: false,
  genshin: false
}
const testAcc7 = {
  name: "Kevin Killer Mk. 5",
  cookie: TestData().cookie,
  honkai: false,
  genshin: false
}
const accounts:AppAccount[] = [testAcc1, testAcc2, testAcc3, testAcc4, testAcc5, testAcc6, testAcc7];

export default class Account extends React.Component{
  declare props:{
    minimize: boolean,
    navigation;
  }
  declare context:{
    setActiveAccount: Function,
    setAccounts: Function
  }
  static contextType = mainContext;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Account context after mount",this.context)
    this.context.setAccounts(accounts);
    this.context.setActiveAccount(accounts[0]);
  }

  render() {
    return (<View style={{
      maxHeight: this.props.minimize? 100 : 200,
      borderWidth:1,
      borderColor:"#ff0000"
    }}>
      <TouchableOpacity onPress={event => this.props.navigation.navigate("Add Account")}>
        <FlatList data={accounts}
                  ListHeaderComponent={<Text style={{
                    fontWeight:"bold"
                  }}>
                    Accounts saved
                  </Text>}
                  renderItem={
                    ({ item, index, separators } ) => {
                      if(this.props.minimize){
                        if(index === 2 && accounts.length > 3){
                          return (<View
                            style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:200}}>
                            <Text>{index+1}.</Text>
                            <Text>{"more..."}</Text>
                          </View>);
                        }
                        if(index > 2){
                          return null;
                        }
                      }
                      return (<View
                        style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:200}}>
                        <Text>{index+1}.</Text>
                        <Text>{item.name}</Text>
                        <Text>{item.cookie.account_id}</Text>
                      </View>);
                    }
                  }/>
      </TouchableOpacity>
    </View>);
  }
}
