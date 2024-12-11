import { View } from "react-native";

export function Dashboard({ children }: any) {
  return (
    <View className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {children}
    </View>
  );
}
