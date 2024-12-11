import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Screen } from "../../../components/Screen";
import { useSession } from "../../ctx";
import { styled } from "nativewind";
import { get, post, put, del } from "../../../services";
import { PRODUCTS_ROUTE } from "@env";
import { toast } from "react-toastify";
import { router } from "expo-router";
import { CancelIcon } from "../../../components/icons/Icons";
import Modal from "react-native-modal";

const Card = styled(View);

export default function App() {
  const { session } = useSession();
  const userRole = session?.usuario[0].rol;
  const [products, setProducts] = useState<
    { _id: string; descripcion: string; precio: number }[]
  >([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * fetchProducts
   */
  const fetchProducts = () => {
    get(PRODUCTS_ROUTE, session?.token)
      .then((response) => {
        console.log(response);
        setProducts(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  /**
   * seeMore
   * @param producrID ID del producto
   */
  const seeMore = (producrID: string) => {
    router.push(`products/${producrID}`);
  };

  /**
   * createProduct
   * @returns null
   */
  const createProduct = () => {
    if (description.length > 100) {
      toast.error("La descripción no puede tener más de 100 caracteres.");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice > 10000) {
      toast.error("El precio debe ser un número y no puede exceder 10000.");
      return;
    }

    const newProduct = { descripcion: description, precio: numericPrice };

    post(PRODUCTS_ROUTE, newProduct, session?.token)
      .then((response) => {
        toast.success("Producto añadido correctamente.");
        setDescription("");
        setPrice("");
        setModalVisible(false);
        fetchProducts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error al añadir el producto.");
      });
  };

  /**
   * updateProduct
   * @returns null
   */
  const updateProduct = () => {
    if (!editingProduct) return;

    const numericPrice = parseFloat(price);
    if (
      description.length > 100 ||
      isNaN(numericPrice) ||
      numericPrice > 10000
    ) {
      toast.error(
        "La descripción debe tener máximo 100 caracteres y el precio ser menor a 10000.",
      );
      return;
    }

    const updatedProduct = { descripcion: description, precio: numericPrice };

    put(`${PRODUCTS_ROUTE}/${editingProduct}`, updatedProduct, session?.token)
      .then(() => {
        toast.success("Producto actualizado correctamente.");
        resetModal();
        fetchProducts();
      })
      .catch(() => {
        toast.error("Error al actualizar el producto.");
      });
  };

  /**
   * deleteProduct
   * @param productID ID del producto
   */
  const deleteProduct = (productID: string) => {
    del(`${PRODUCTS_ROUTE}${productID}`, session?.token)
      .then(() => {
        toast.warn("Producto eliminado.");
        fetchProducts();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  /**
   * openEditModal
   * @param product product object
   */
  const openEditModal = (product: {
    _id: string;
    descripcion: string;
    precio: number;
  }) => {
    setDescription(product.descripcion);
    setPrice(product.precio.toString());
    setEditingProduct(product._id);
    setModalVisible(true);
  };

  /**
   * resetModal
   */
  const resetModal = () => {
    setDescription("");
    setPrice("");
    setEditingProduct(null);
    setModalVisible(false);
  };

  /**
   * toggleTooltip
   * @param product producto
   */
  const toggleTooltip = (product: any) => {
    if (isMenuVisible) {
      closeTooltip();
    } else {
      setSelectedProduct(product);
      setMenuVisible(true);
    }
  };

  /**
   * closeTooltip
   */
  const closeTooltip = () => {
    setSelectedProduct(null);
    setMenuVisible(false);
  };

  return (
    <Screen>
      <ScrollView className="space-y-4">
        <View className="flex-row flex-wrap gap-4">
          <FlatList
            className="sm:m-0 lg:m-2"
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <Card className="flex flex-row justify-between p-2 w-full">
                <View className="w-auto">
                  <Image
                    source={{ uri: "https://via.placeholder.com/100" }}
                    className="w-20 h-20 rounded"
                    resizeMode="cover"
                  />
                </View>

                <View className="w-4/6 px-2">
                  <Text className="text-lg font-bold">{item.descripcion}</Text>
                  <Text className="text-gray-600">Precio: ${item.precio}</Text>
                  <Text className="text-gray-500 mt-1">
                    Descripción breve...
                  </Text>
                </View>

                <View className="w-auto items-end relative">
                  <Pressable
                    onPress={() => toggleTooltip(item)}
                    className="p-2 bg-gray-200 rounded-full z-20"
                  >
                    <Text className="text-lg font-bold">...</Text>
                  </Pressable>

                  {isMenuVisible && selectedProduct?._id === item._id && (
                    <View className="absolute top-10 right-0 bg-white shadow-md rounded-lg p-3 z-30 border border-gray-300">
                      <Pressable
                        onPress={() => {
                          seeMore(item._id);
                          closeTooltip();
                        }}
                        className="p-2 bg-blue-500 rounded-lg mb-2"
                      >
                        <Text className="text-white text-center">Ver más</Text>
                      </Pressable>
                      {userRole === "admin" && (
                        <>
                          <Pressable
                            onPress={() => {
                              openEditModal(item);
                              closeTooltip();
                            }}
                            className="p-2 bg-gray-300 rounded-lg mb-2"
                          >
                            <Text className="text-black text-center">
                              Editar
                            </Text>
                          </Pressable>
                          <Pressable
                            onPress={() => {
                              deleteProduct(item._id);
                              closeTooltip();
                            }}
                            className="p-2 bg-red-500 rounded-lg"
                          >
                            <Text className="text-white text-center">
                              Eliminar
                            </Text>
                          </Pressable>
                        </>
                      )}
                    </View>
                  )}
                </View>
              </Card>
            )}
            ItemSeparatorComponent={() => <View className="h-px bg-gray-200" />}
          />
        </View>
      </ScrollView>

      <Modal isVisible={isModalVisible}>
        <View className="flex justify-center items-center">
          <View className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg z-50">
            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold text-gray-800">
                {editingProduct ? "Editar Producto" : "Añadir Producto"}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600">Descripción</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mt-2 text-sm"
                placeholder="Máximo 100 caracteres"
                value={description}
                onChangeText={setDescription}
                maxLength={100}
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600">Precio</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mt-2 text-sm"
                placeholder="Máximo 10000"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
            </View>

            <View className="flex flex-row justify-between items-center">
              <Pressable
                onPress={resetModal}
                className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-700"
              >
                <Text className="text-center font-bold text-white">
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                onPress={editingProduct ? updateProduct : createProduct}
                className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-700"
              >
                <Text className="text-center font-bold text-white">
                  {editingProduct ? "Actualizar" : "Crear"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {userRole === "admin" && (
        <Pressable
          className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ userSelect: "none" }} className="text-white font-bold">
            Añadir producto
          </Text>
        </Pressable>
      )}
    </Screen>
  );
}
