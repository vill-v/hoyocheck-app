import React from 'react';
import { FlatList, ScrollView, Text, View } from "react-native";
import TestData from "./testdata";

const testAcc1 = {
  name: "The Magician",
  cookie: TestData().cookie,
  honkai: true,
  genshin: false
}
const testAcc2 = {
  name: "The Engineer",
  cookie: TestData().cookie,
  honkai: true,
  genshin: false
}
const accounts = [testAcc1, testAcc2]

export default class Account extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (<View>
      <FlatList data={accounts}
                ListHeaderComponent={<Text>Accounts saved</Text>}
                renderItem={
        ({ item, index, separators } ) => (<View
        style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:200}}>
          <Text>{index+1}.</Text>
          <Text>{item.name}</Text>
          <Text>{item.cookie.account_id}</Text>
        </View>)
      }/>
    </View>);
  }
}
