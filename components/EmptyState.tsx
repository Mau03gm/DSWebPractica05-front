import { View, Image, Text } from "react-native";

const notfound = require("./../assets/notfound.png");

export function EmptyState(props: any) {
  return (
    <View className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <View className="justify-center items-center mb-5">
        <Image resizeMode="contain" source={notfound} className="h-52 w-52" />
      </View>
      <Text className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        ¡Ups!
      </Text>
      <Text className="text-center mt-6 text-base leading-7 text-gray-600">
        {props.message}
      </Text>
    </View>
  );
}
