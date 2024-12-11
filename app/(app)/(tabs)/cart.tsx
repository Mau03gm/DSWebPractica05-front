import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { Screen } from "../../../components/Screen";
import { useSession } from "../../ctx";
import { toast } from "react-toastify";
import { post, get } from "../../../services";
import { SALES_ROUTE, UTIL_ROUTE, UTIL_DOWNLOAD, UTIL_SEND } from "@env";
import { ShoppingCart } from "../../../components/icons/Icons";
import { router } from "expo-router";

export default function App() {
  const { session } = useSession();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || '{"detalle": [], "total": 0}',
    );
    setCart(savedCart.detalle);
    setTotal(savedCart.total);
  }, []);

  /**
   * removeFromCart
   * @param productId id del producto
   */
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.producto._id !== productId);
    // Actualizar el carrito en localStorage
    const newCart = {
      detalle: updatedCart,
      total: calculateTotal(updatedCart),
    };
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(updatedCart);
    toast.success("Producto eliminado del carrito");
  };

  /**
   * calculateTotal
   * @param cart carrito actual
   * @returns {number} total de la compra
   */
  const calculateTotal = (cart: any[]) => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  /**
   * handlePurchase
   */
  const handlePurchase = () => {
    if (cart.length === 0) {
      toast.warn("No tienes productos en tu carrito jejejeje");
    } else {
      let venta = {
        cliente: {
          _id: session?.usuario[0]._id,
          nombre: session?.usuario[0].nombre,
          correo: session?.usuario[0].correo,
        },
        detalle: cart,
        total: total,
      };
      console.log(venta);

      post(SALES_ROUTE, venta, session?.token)
        .then((response) => {
          console.log(response);
          localStorage.removeItem("cart");
          setCart([]);
          getSaleReport(response._id);
          downloadReport(response._id);
          toast.success("Compra realizada exitósamente!!!!!");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    }
  };

  /**
   * getSaleReport
   * @param ventaID id de venta
   */
  const getSaleReport = (ventaID: string) => {
    console.log(ventaID);
    get(`${UTIL_ROUTE}${UTIL_SEND}${ventaID}`, session?.token)
      .then((response) => {
        console.log(response);
        toast.success("Reporte enviado");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  /**
   * downloadReport
   * @param ventaID id de venta
   */
  const downloadReport = (ventaID: string) => {
    console.log(ventaID);
    get(`${UTIL_ROUTE}${UTIL_DOWNLOAD}${ventaID}`, session?.token)
      .then((response) => {
        console.log(response);
        toast.success("Reporte descargado");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <Screen>
      <ScrollView className="flex-1">
        <View className="bg-white p-6 rounded-lg">
          <Text className="text-2xl font-bold text-gray-900 mb-4">Carrito</Text>

          {cart.length === 0 ? (
            <View className="flex-1 items-center">
              <View className="p-4 my-5">
                <ShoppingCart color="gray" size={150} />
              </View>

              <Text className="text-4xl font-bold">El carrito está vacío.</Text>
              <Text className="text-2xl text-gray-600">
                Añade productos para poder comprar.
              </Text>
              <Pressable
                className="bg-blue-500 p-4 rounded-full shadow-lg m-6"
                onPress={() => router.push("/")}
              >
                <Text
                  style={{ userSelect: "none" }}
                  className="text-white text-2xl font-bold"
                >
                  Añadir productos
                </Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <FlatList
                className="sm:m-0 lg:m-2"
                data={cart}
                keyExtractor={(item) => item.producto._id}
                renderItem={({ item, index }) => (
                  <View className="flex flex-row justify-between p-2 w-full">
                    <View className="w-auto">
                      <Image
                        source={{ uri: "https://via.placeholder.com/100" }}
                        className="w-32 h-full object-contain"
                        resizeMode="contain"
                      />
                    </View>

                    <View className="w-4/6 px-2">
                      <Text className="text-xl font-bold">
                        {item.producto.descripcion}
                      </Text>
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
                        onPress={() => removeFromCart(item.producto._id)}
                        className="mt-4 p-2 bg-red-500 rounded-lg"
                      >
                        <Text className="text-white text-center">Eliminar</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => (
                  <View className="my-1 h-px bg-slate-300" />
                )}
              />
              <View className="w-1/2 self-end border-t border-t-slate-300">
                {/* Total de la compra */}
                <View className="flex flex-row justify-between p-2 w-full">
                  <View className="w-1/2">
                    <Text className="text-2xl font-bold">Total:</Text>
                    <Text className="text-xl">Artículos: {cart.length}</Text>
                  </View>
                  <View className="w-1/2">
                    <Text className="text-4xl font-bold">
                      ${calculateTotal(cart)}
                    </Text>
                  </View>
                </View>

                {/* Botón de Comprar */}
                <Pressable
                  onPress={handlePurchase}
                  className="mt-6 p-4 bg-blue-500 rounded-full"
                >
                  <Text className="text-white text-center text-xl font-bold">
                    Comprar
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
