import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native'
import { registerStyle } from '../../../styles/registerComponent/RegisterViewStyle';
import { Entypo } from '@expo/vector-icons';
import Ionicons from "@expo/vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../../../Firebase";
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../../../../Firebase';

// Poner como default el Usuario = "User"

const Register = ({navigation}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  const handleRegister = async () => {
    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Obtener el ID del usuario
      await firebase.database().ref(`Users/${userCredential.user.uid}`).set({
        nombre: name,
        email: email,
        password: password,
        telefono: phone,
        area: area,
      });
      navigation.navigate('Login');
      alert('Usuario registrado con éxito');
       // Aquí puedes redirigir a la pantalla de inicio o hacer cualquier otra cosa después del registro exitoso
    } catch (error) {
      console.error('Error al registrar el usuario: ', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={registerStyle.containerScroll}>
      <ImageBackground
        source={require("../../../../assets/fondo.jpg")}
        style={registerStyle.backgroundImage}
        imageStyle={{ opacity: 0.25 }}
      >
        <View style={registerStyle.containerBody}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={registerStyle.image}
              source={require("../../../../assets/emerson.png")}
            />
          </View>
          <View style={registerStyle.container}>
            <View style={registerStyle.material}>
              <Ionicons name="person" size={28} paddingHorizontal={8} />
              <TextInput
                style={registerStyle.input}
                placeholder="Ingrese su nombre y apellidos"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />
            </View>
            <View style={registerStyle.material}>
            <Ionicons name="mail" size={28} paddingHorizontal={8} />
              <TextInput
                style={registerStyle.input}
                placeholder="Ingrese su Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
                />
            </View>
            <View style={registerStyle.material}>
              <Entypo name="lock" size={28} paddingHorizontal={8} />
              <TextInput
                style={registerStyle.input}
                placeholder="Ingrese su Contraseña"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                secureTextEntry={true}
              />
            </View>

            <View style={registerStyle.material}>
              <FontAwesome name="phone" size={28} paddingHorizontal={8} />
              <TextInput
                style={registerStyle.input}
                placeholder="Ingrese su número de celular"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                }}
              />
            </View>

            <View style={registerStyle.material}>
              <Ionicons name="business" size={28} paddingHorizontal={8} />
              <TextInput
                style={registerStyle.input}
                placeholder="Ingrese el área en la que labora"
                value={area}
                onChangeText={(text) => {
                  setArea(text);
                }}
              />
            </View>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity style={registerStyle.buttonLogin} onPress={handleRegister}>
                <Text style={registerStyle.buttonTextLoggin}>Register</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text>Already register? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: "center",
              }}
            ></View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

export default Register