import { Tabs } from "expo-router";
import {
  ShoppingCart,
  ClipBoardList,
  BoxIcon,
} from "../../../components/icons/Icons";
import { useSession } from "../../ctx";
import { Pressable, Text } from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function TabLayout() {
  const { session, signOut } = useSession();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#059669",
        headerRight: () => (
          <StyledPressable
            onPress={signOut}
            className="p-2 rounded-lg bg-danger active:opacity-70 mr-4"
          >
            <Text className="text-white text-center font-bold">
              Cerrar sesión
            </Text>
          </StyledPressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Productos",
          tabBarIcon: ({ color }) => <ClipBoardList size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color }) => <ShoppingCart size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="compras"
        options={{
          title: "Mis compras",
          tabBarIcon: ({ color }) => <BoxIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
