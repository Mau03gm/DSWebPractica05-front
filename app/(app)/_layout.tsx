import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { Stack, Redirect } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NativeWindStyleSheet } from "nativewind";
import { useSession } from "../ctx";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  const { session, isLoading } = useSession();
  // You can keep the splash screen open, or render a loading screen like we do here.
  // Credits to: https://github.com/lumamontes
  if (isLoading && session) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.

  if (session?.usuario == null) {
    return <Redirect href="/login" />;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }
  return (
    <SafeAreaProvider>
      <View className="flex-1">
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
