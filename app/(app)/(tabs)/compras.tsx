import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { Screen } from "../../../components/Screen";
import { useSession } from "../../ctx";
import { get } from "../../../services";
import { SALES_ROUTE } from "@env";
import { toast } from "react-toastify";
import { router } from "expo-router";

export default function App() {
  const { session } = useSession();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  /**
   * fetchSales
   */
  const fetchSales = () => {
    get(`${SALES_ROUTE}cliente/${session?.usuario[0]._id}`, session?.token)
      .then((response) => {
        setSales(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al obtener las ventas.");
      });
  };

  /**
   * renderProductDetails
   * @param detalle detalle de la venta
   * @returns map de datos
   */
  const renderProductDetails = (detalle: any) => {
    return detalle.map((item: any, index: number) => (
      <View
        key={index}
        className="flex flex-row justify-between p-2 w-full border-b border-b-slate-200"
      >
        <View className="w-auto">
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            className="w-32 h-full object-contain"
            resizeMode="contain"
          />
        </View>

        <View className="w-4/6 px-2">
          <Text className="text-xl font-bold">{item.producto.descripcion}</Text>
          <Text className="text-lg text-black">
            Precio: ${item.producto.precio}
          </Text>
          <Text className="text-lg text-gray-600">
            Cantidad: {item.cantidad}
          </Text>
          <Text className="text-lg text-gray-600">
            Subtotal: ${item.subtotal}
          </Text>
        </View>

        <View className="w-auto px-2">
          <Pressable
            onPress={() => router.push(`/products/${item.producto._id}`)}
            className="mt-4 p-2 bg-blue-500 rounded-lg"
          >
            <Text className="text-white text-center">Volver a comprar</Text>
          </Pressable>
        </View>
      </View>
    ));
  };

  return (
    <Screen>
      <ScrollView className="p-5">
        {sales.length === 0 ? (
          <Text className="text-xl text-center text-gray-500">
            No tienes compras.
          </Text>
        ) : (
          sales.map((sale: any, index) => (
            <View key={index} className="mb-5 p-4 rounded-xl shadow-md">
              <Text className="font-bold text-lg mb-2">
                Número de orden: {sale._id}
              </Text>
              <Text className="font-semibold text-lg mb-2">
                Fecha: {new Date(sale.fecha).toLocaleDateString()}
              </Text>
              {renderProductDetails(sale.detalle)}

              <View className="w-1/2 self-end border-l border-l-slate-200">
                {/* Total de la compra */}
                <View className="flex flex-row justify-between p-2 w-full">
                  <View className="w-1/2">
                    <Text className="text-2xl font-bold">Total:</Text>
                    <Text className="text-xl">MXN</Text>
                  </View>
                  <View className="w-1/2">
                    <Text className="text-4xl font-bold">${sale.total}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
