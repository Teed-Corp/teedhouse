import { Image, View } from "react-native";

export default function SplashScreenPage() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        className="w-60 h-60"
        source={require("../../../assets/teedhouse-logo.png")}
      />
    </View>
  );
}
