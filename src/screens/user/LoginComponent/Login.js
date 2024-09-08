import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground, ScrollView, Alert } from 'react-native'
import { loginStyle } from '../../../styles/userStyles/LoginViewStyle.js'
import { Entypo } from '@expo/vector-icons';
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import firebase, { auth } from "../../../../Firebase";
import * as SecureStore from "expo-secure-store";
import { isValidInput } from '../../../util/Util';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = () => {
        const inputsAreValid = isValidInput(email, password);
        if (!inputsAreValid) {
            Alert.alert(
                "Error",
                "Por favor, complete todos los campos correctamente."
            );
            return;
        }

        setLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (userCredentials) => {
                const user = userCredentials.user;
                const userUID = user.uid;
                await SecureStore.setItemAsync("userUID", userUID);

                const userSnapshot = await firebase.database().ref(`Users/${userUID}/tipo`).once("value");
                const userType = userSnapshot.val();

                if (userType === "User") {
                    navigation.navigate("Menu");
                } else if (userType === "Admin") {

                    navigation.navigate("Rol");
                } else {
                    Alert.alert("Error", "Tipo de usuario desconocido.");
                }

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert("Error", error.message);
            });
    };


    const handleRegister = () => {
        navigation.navigate("Register");
    };

    return (
        <ScrollView contentContainerStyle={loginStyle.containerScroll}>
            <ImageBackground
                source={require("../../../../assets/background_color.jpg")}
                style={loginStyle.backgroundImage}
                imageStyle={{ opacity: 1 }}
            >
                <View style={loginStyle.containerBody}>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            style={loginStyle.image}
                            source={require("../../../../assets/logoStockFlow.png")}
                        />
                    </View>
                    <View style={loginStyle.container}>
                        <View style={loginStyle.material}>
                            <Entypo name="mail" size={28} paddingHorizontal={8} />
                            <TextInput
                                style={loginStyle.input}
                                placeholder="Ingrese su Email"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                }}
                            />
                        </View>
                        <View style={loginStyle.material}>
                            <Entypo name="lock" size={28} paddingHorizontal={8} />
                            <TextInput
                                style={loginStyle.input}
                                placeholder="Ingrese su Contraseña"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                }}
                                secureTextEntry={true}
                            />
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity style={loginStyle.buttonLogin} onPress={handleLogin}>
                                <Text style={loginStyle.buttonTextLoggin}>Login</Text>
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
                            <Text>New to the App? </Text>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
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

            <Spinner
                visible={loading}
                textContent={"Cargando..."}
                textStyle={{ color: "#FFF" }}
            />
        </ScrollView>

    );
}

export default Login