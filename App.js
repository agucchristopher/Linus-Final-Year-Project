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
import mic from "./assets/mic.png";
import micc from "./assets/mic-slash.png";
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
    await Voice.start("en-NZ");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    console.log(result);
    setResults(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

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
            source={!started ? mic : micc}
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
