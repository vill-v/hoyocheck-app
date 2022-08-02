import React from "react";
import { Text, View } from "react-native";
import {mainContext} from "./mainContext";

const Status = () => {
  return <View style={{
    flexBasis:100,
    flexGrow:1,
    flexShrink:1,
    borderWidth:1,
    borderColor:"#dd22dd"
  }}>
    <View>
      <Text>last run</Text>
      <mainContext.Consumer>
        {({lastResult})=><Text>{JSON.stringify(lastResult)}</Text>}
      </mainContext.Consumer>
    </View>
    <Text>(reward preview...)</Text>
  </View>;
}
export default Status;
