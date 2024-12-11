import React, { useState, useEffect } from "react";
import { useSession } from "../../ctx";
import { styled } from "nativewind";
import {
  Text,
  Pressable,
  ActivityIndicator,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import { Screen } from "../../../components/Screen";
import { get, put } from "../../../services";
import { router, useLocalSearchParams } from "expo-router";
import { toast } from "react-toastify";
import { PRODUCTS_ROUTE } from "@env";

export default function App() {
  const { session } = useSession();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<{
    _id: string;
    descripcion: string;
    precio: number;
  }>();
  const [isLoading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad

  useEffect(() => {
    fetchProduct();
  }, []);

  /**
   * fetchContent
   * Obtiene la inforación del contenido
   */
  const fetchProduct = async () => {
    get(`${PRODUCTS_ROUTE}/${id}`, session?.token)
      .then((response) => {
        console.log(response);
        setProduct(response);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  /**
   * backToList
   */
  const backToList = () => {
    router.push("/");
  };

  /**
   * addToCart
   * @returns null
   */
  const addToCart = () => {
    if (quantity < 1 || quantity > 10) {
      toast.error("La cantidad debe ser entre 1 y 10.");
      return;
    }
    console.log("Producto:", product, "Cantidad:", quantity);

    const savedCart = JSON.parse(
      localStorage.getItem("cart") || '{"detalle": [], "total": 0}',
    );

    const existingProductIndex = savedCart.detalle.findIndex(
      (item: any) => item.producto._id === product?._id,
    );

    const precio: number = product?.precio ?? 0.0;
    const subtotal = precio * quantity;

    if (existingProductIndex !== -1) {
      savedCart.detalle[existingProductIndex].cantidad += quantity;
      savedCart.detalle[existingProductIndex].subtotal =
        savedCart.detalle[existingProductIndex].cantidad * precio;
    } else {
      savedCart.detalle.push({
        producto: product,
        cantidad: quantity,
        subtotal: subtotal,
      });
    }

    savedCart.total = savedCart.detalle.reduce(
      (total: number, item: any) => total + item.subtotal,
      0,
    );

    localStorage.setItem("cart", JSON.stringify(savedCart));

    toast.success(`Producto añadido al carrito con ${quantity} unidades`);
    console.log("Carrito actualizado:", localStorage.getItem("cart"));
  };

  /**
   * incrementQuantity
   */
  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  /**
   * decrementQuantity
   */
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (isLoading)
    return (
      <Screen>
        <ActivityIndicator className="flex-1" size="large" color="#020617" />
      </Screen>
    );

  return (
    <Screen>
      <ScrollView className="flex-1 p-6 bg-background">
        <View className="bg-white p-6 rounded-lg shadow-md">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            {product?.descripcion}
          </Text>
          <Text className="text-lg text-gray-600 mb-4">
            Precio: ${product?.precio}
          </Text>

          {/* Descripción completa del producto */}
          <Text className="text-gray-700 mb-4">
            Aquí puedes agregar una descripción más detallada del producto. Esta
            sección puede incluir más detalles o características que destaquen
            su valor y utilidad.
          </Text>

          {/* Controles de cantidad */}
          <View className="flex-row items-center mb-4">
            <Pressable
              onPress={decrementQuantity}
              className="p-2 bg-gray-300 rounded-lg"
            >
              <Text className="text-lg font-bold">-</Text>
            </Pressable>
            <TextInput
              value={String(quantity)}
              onChangeText={(text) =>
                setQuantity(Math.min(10, Math.max(1, parseInt(text))))
              }
              keyboardType="numeric"
              className="mx-4 text-center w-12"
            />
            <Pressable
              onPress={incrementQuantity}
              className="p-2 bg-gray-300 rounded-lg"
            >
              <Text className="text-lg font-bold">+</Text>
            </Pressable>
          </View>

          <View className="w-full flex-row">
            <View className="w-1/2 p-2">
              <Pressable
                onPress={addToCart}
                className="mt-4 p-4 bg-blue-500 rounded-lg"
              >
                <Text className="text-white text-center text-lg">
                  Añadir al carrito
                </Text>
              </Pressable>
            </View>
            <View className="w-1/2 p-2">
              <Pressable
                onPress={backToList}
                className="mt-4 p-4 bg-gray-300 rounded-lg"
              >
                <Text className="text-black text-center text-lg">
                  Volver a la lista
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
