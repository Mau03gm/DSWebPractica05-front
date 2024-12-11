import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SessionProvider } from "./ctx";

import { NativeWindStyleSheet } from "nativewind";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Layout() {
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <View className="flex-1">
          <ToastContainer position="bottom-center" />
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
      </SafeAreaProvider>
    </SessionProvider>
  );
}
