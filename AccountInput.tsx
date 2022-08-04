// noinspection HtmlRequiredLangAttribute

import Clipboard from "@react-native-clipboard/clipboard";
import React from "react";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import {mainContext} from "./mainContext";

const cookieGetter = (renderMethod:"docWrite"|"body"|"prompt", showHelp:boolean, escapeSpaces:boolean) => {
  let command:string;
  const base = "document.cookie";

  //note: wrapping quotes are required
  const page = showHelp ? (
      escapeSpaces ?
        //help+escape
        `'<html><body><h1>Copy_the_following_text</h1><h2>(try_long-press_then_select_all_then_copy)</h2><textarea_readonly="readonly"_spellcheck="false"_autofocus="autofocus">'.replaceAll('_',String.fromCharCode(32))+${base}+'</textarea></body></html>'`
        :
        //help+noescape
        `'<html><body><h1>Copy the following text</h1><h2>(try long-press, select all, copy)</h2><textarea readonly="readonly" spellcheck="false" autofocus="autofocus">'+${base}+'</textarea></body></html>'`
    ) :
    //nohelp
    `'<html><body>'+${base}+'</body></html>'`;

  //note: wrapping quotes are required
  //message is necessary for prompt, so showHelp is irrelevant
  const prompt = escapeSpaces ?
    //escape
    `'Copy_the_following_text_(try_long-press,_select_all,_copy)'.replaceAll('_',String.fromCharCode(32))`
    :
    //noescape
    `'Copy the following text (try long-press, select all, copy)'`;

  switch (renderMethod) {
    case "docWrite":
      command = `document.write(${page});document.close();`;
      break;
    case "body":
      command = `document.body.parentElement.innerHTML=${page}`;
      break;
    case "prompt":
      command = `window.prompt(${prompt},${base});`;
      break;
  }
  return `javascript:(function(){${command})();`;
};

const AccountInput = () => {
  const [clip, setClip] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems:"center",
    backgroundColor: "#336622"}}>
      <View style={{display: isProcessing ? "flex" :"none", flex:1,
        borderStyle:"dashed", borderWidth:1}}>
        <Text>Validating...</Text>
        <Text>{clip}</Text>
      </View>
      <View style={{flexBasis: "50%", flexGrow:0, flexShrink:3, margin: 10,
        borderStyle:"dashed", borderWidth:1, alignItems:"center", justifyContent:"center"}}>
        <Text>To add an account, copy your Hoyolab cookie then click the button below</Text>
        <TouchableOpacity style={{backgroundColor:"#aa00aa",
          borderStyle:"solid", borderWidth:2, borderRadius:5,
          width: 300, margin: 10, alignItems:"center", justifyContent:"center"}}
                          onPress={async () => {
                            const text = await Clipboard.getString();
                            setClip(text);
                            setIsProcessing(true);
                          }}>
          <Text style={{ fontSize: 30, fontWeight:"bold", margin:5 }}>Paste cookie</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems:"flex-start", justifyContent:"center",
        height: 100, borderStyle:"dashed", borderWidth:1}}>
        <Text style={{alignSelf:"center"}}>Don't know how to get your cookie?</Text>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={{backgroundColor:"#669999", height: 40,
            borderStyle: "solid", borderWidth: 1, borderRadius: 5,
            margin:5, alignItems: "center", justifyContent: "center"}} onPress={() => {
            Clipboard.setString(cookieGetter("docWrite", true, true));
          }}>
            <Text style={{fontSize: 20}}>Copy bookmarklet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:"#999999", height: 40,
            borderStyle: "solid", borderWidth: 1, borderRadius: 5,
            margin:5, alignItems: "center", justifyContent: "center"}} onPress={() => {
            console.log("help");
          }}>
            <Text style={{fontSize: 20}}>See help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default AccountInput;
