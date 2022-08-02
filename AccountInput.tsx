import Clipboard from "@react-native-clipboard/clipboard";
import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import {mainContext} from "./mainContext";

const AccountInput = () => {
  const [clip, setClip] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center",
    backgroundColor: "#336622"}}>
      <View>
        <Text>To add an account, first get your cookie: (help link placeholder)</Text>
        <TouchableOpacity style={{backgroundColor:"#aa00aa"}} onPress={() => {
          Clipboard.setString('javascript:copy(document.cookie);alert("copied");');
        }}>
          <Text>Copy bookmarklet</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Add account</Text>
        <TouchableOpacity style={{backgroundColor:"#aa00aa",
          borderStyle:"solid", borderWidth:2, borderRadius:5}}
                          onPress={async () => {
          const text = await Clipboard.getString();
          setClip(text);
          setIsProcessing(true);
        }}>
          <Text style={{ fontSize: 30 }}>Paste cookie</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: isProcessing ? "flex" :"none"}}>
        <Text>Validating...</Text>
        <Text>{clip}</Text>
      </View>
    </SafeAreaView>
  );
}
export default AccountInput;
