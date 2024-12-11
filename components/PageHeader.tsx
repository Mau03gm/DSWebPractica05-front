import { View, Text } from "react-native";

type PageHeaderProps = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <View className="bg-zinc-50 shadow">
      <View className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Text className="w-full text-2xl font-semibold tracking-tight text-gray-900 text-left">
          {title}
        </Text>
      </View>
    </View>
  );
}
