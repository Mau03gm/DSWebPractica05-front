import React from "react";
import { View, Text } from "react-native";

interface BadgeProps {
  label: string;
  color: "green" | "yellow" | "red" | "slate";
}

export default function BadgeComponent({ label, color }: BadgeProps) {
  const bgColor = {
    green: "bg-green-400",
    yellow: "bg-yellow-400",
    red: "bg-red-400",
    slate: "bg-slate-400",
  }[color];

  return (
    <View className={`px-3 py-1 m-1 rounded-md ${bgColor}`}>
      <Text className="text-xs font-semibold text-white">{label}</Text>
    </View>
  );
}
