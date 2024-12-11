import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { BarsIcon } from "./icons/Icons";

const logoImage = require("../assets/icon.png");

export function DrawerHeader() {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <BarsIcon />
      </TouchableOpacity>

      <View className="flex-shrink-0">
        <Image source={logoImage} className="h-8 w-8" />
      </View>
      <View className="ml-4">
        <Text className="text-md font-medium text-slate-900">Practica05</Text>
      </View>
    </View>
  );
}
