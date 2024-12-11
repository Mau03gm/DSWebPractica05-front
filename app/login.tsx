import { useState } from "react";

import { View, Text, TextInput, Pressable, Image } from "react-native";
import { styled } from "nativewind";

import { useSession } from "./ctx";
import { API_URL, AUTH_LOGIN } from "@env";
import { Redirect } from "expo-router";

const StyledPressable = styled(Pressable);
const logoImage = require("../assets/logo.png");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { signIn, session } = useSession();

  /**
   * validateEmail
   * @param email String user's email
   * @returns bolean
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  /**
   * resetErrors
   */
  const resetErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  /**
   * handleLogin
   * @returns null
   */
  const handleLogin = () => {
    resetErrors();
    console.log(API_URL, AUTH_LOGIN);

    if (!email) {
      setEmailError("Por favor, ingresa tu correo");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("El correo debe ser @uv.mx o @estudiantes.uv.mx");
      return;
    }
    if (!password) {
      setPasswordError("Por favor, ingresa tu contraseña");
      return;
    }

    signIn(email, password);
  };

  if (session && session?.usuario != null) {
    return <Redirect href="/" />;
  }
  return (
    <View className="flex-1 flex-row items-center justify-center bg-gray-100">
      <View className="w-full max-w-md py-20 px-6 bg-white rounded-lg shadow-lg">
        {/* Formulario de inicio de sesión */}
        <View className="items-center justify-center">
          <Image
            source={logoImage}
            className="w-full h-32 object-contain mb-6"
            resizeMode="contain"
          />

          <Text className="text-2xl font-bold mb-1 text-primary">
            Nombre de la APP
          </Text>
          <Text className="text-xl mb-6">Inicia Sesión</Text>

          {/* Campo de correo */}
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full"
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <Text className="text-red-500 mb-4">{emailError}</Text>
          ) : null}

          {/* Campo de contraseña */}
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError ? (
            <Text className="text-red-500 mb-4">{passwordError}</Text>
          ) : null}

          {/* Botón de login */}
          <StyledPressable
            onPress={handleLogin}
            className="w-full p-4 rounded-lg bg-blue-600 active:opacity-70"
          >
            <Text className="text-white text-center font-bold">
              Iniciar sesión
            </Text>
          </StyledPressable>
        </View>
      </View>
    </View>
  );
}
