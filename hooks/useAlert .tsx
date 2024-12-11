import { Platform } from "react-native";
import { Alert } from "react-native";

const useAlert = () => {
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  return showAlert;
};

export default useAlert;
