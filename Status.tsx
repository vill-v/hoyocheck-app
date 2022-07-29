import React from "react";
import { Text, View } from "react-native";

export default class Status extends React.Component {
  declare props:{
    checkin:MihoyoCheckInResult|null
  }
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={{
      flexBasis:100,
      flexGrow:1,
      flexShrink:1,
      borderWidth:1,
      borderColor:"#dd22dd"
    }}>
      <View>
        <Text>last run</Text>
        <Text>{JSON.stringify(this.props.checkin)}</Text>
      </View>
      <Text>(reward preview...)</Text>
    </View>;
  }
}
