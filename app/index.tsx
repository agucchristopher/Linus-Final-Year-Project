import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import Voice from "@react-native-voice/voice";
// import mic from "./assets/images/mic.png";
// import micc from "../assets/images/mic-slash.png";
// import translate from "translate-google";
// import Svg, { Path, Rect } from "react-native-svg";

export default function App() {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    if (Voice) {
      try {
        await Voice?.start("en-US").catch((e) => console.log(e));
        setStarted(true);
        console.log("Listening....");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const stopSpeechToText = async () => {
    if (Voice) {
      try {
        await Voice.stop();
        setStarted(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSpeechResults = (result: any) => {
    console.log(result);
    setResults(result.value);
  };

  const onSpeechError = (error: any) => {
    console.log(error);
  };
  // translate("I speak Dutch!", { from: "en", to: "nl" })
  //   .then((res) => {
  //     console.log(res.text);
  //     //=> Ik spreek Nederlands!
  //     console.log(res.from.text.autoCorrected);
  //     //=> true
  //     console.log(res.from.text.value);
  //     //=> I [speak] Dutch!
  //     console.log(res.from.text.didYouMean);
  //     //=> false
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  return (
    <View style={styles.container}>
      {results.map((result, index) => (
        <Text style={{ color: "white" }} key={index}>
          {result}
        </Text>
      ))}
      <View style={{ position: "absolute", bottom: 30 }}>
        <TouchableOpacity
          onPressIn={() => {
            setStarted(true);
            startSpeechToText();
          }}
          onPressOut={() => {
            setStarted(false);
            stopSpeechToText();
          }}
          style={{
            borderWidth: 2,
            borderRadius: 1000,
            padding: 5,
            backgroundColor: "lightblue",
            height: 65,
            width: 65,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "lightblue",
          }}
        >
          <Image
            source={
              !started
                ? require("../assets/images/mic.png")
                : require("../assets/images/mic-slash.png")
            }
            resizeMode="cover"
            height={20}
            style={{ height: 25, width: 25 }}
            width={25}
          />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
});
