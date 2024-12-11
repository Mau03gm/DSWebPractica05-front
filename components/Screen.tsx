import { View } from "react-native";

export function Screen({ children }: any) {
  return <View className="flex-1 p-6 bg-background">{children}</View>;
}
