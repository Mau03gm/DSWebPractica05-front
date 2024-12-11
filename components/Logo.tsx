import { View, Image, Text } from "react-native";

const logoImage = require("../assets/icon.png");

export function Logo() {
  return (
    <View className="flex-1 items-center justify-between py-4">
      <Image className="h-20 w-20" source={logoImage} />
      <View className="px-4">
        <Text className="text-black text-sm font-medium">Practica05</Text>
      </View>
    </View>
  );
}
