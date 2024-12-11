import React from "react";
import { View, Text, Pressable } from "react-native";

interface ModalBodyProps {
  title: string;
  body: string;
  successText: string;
  cancelText: string;
  successAction: () => void;
  cancelAction: () => void;
}

const ModalBody: React.FC<ModalBodyProps> = ({
  title,
  body,
  successText,
  cancelText,
  successAction,
  cancelAction,
}) => {
  return (
    <View className="flex justify-center items-center">
      <View className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg z-50">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="text-xl font-semibold text-gray-800">{title}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-sm text-gray-600">{body}</Text>
        </View>

        <View className="flex flex-row justify-between items-center mb-4">
          <Pressable
            onPress={cancelAction}
            className="bg-danger py-2 px-4 rounded-lg hover:bg-red-900"
          >
            <Text className="text-center font-bold text-white">
              {cancelText}
            </Text>
          </Pressable>

          <Pressable
            onPress={successAction}
            className="bg-success py-2 px-4 rounded-lg hover:bg-green-900"
          >
            <Text className="text-center font-bold text-white">
              {successText}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ModalBody;
