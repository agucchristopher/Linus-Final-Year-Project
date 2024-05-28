import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Text style={{ color: "white", fontFamily: "SpaceMono" }}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
