import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { addToCartFirebaseInProgress } from '../../components/CartLoans';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import 'firebase/database';
import * as SecureStore from "expo-secure-store";
import firebase from '../../../Firebase.js';

const ProductDetail = ({ route }) => {
  const { productDetail } = route.params;
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [quantityRequested, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (quantityRequested > 1) {
      setQuantity(quantityRequested - 1);
    }
  }

  const handleIncreaseQuantity = () => {
    if (quantityRequested < productDetail.stock) {
      setQuantity(quantityRequested + 1);
    }
  }

  const fetchUserMainData = async () => {
    try {
      const uid = await SecureStore.getItemAsync("userUID");
      if (uid) {
        const userRef = firebase.database().ref(`Users/${uid}`);
        userRef.once('value', snapshot => {
          const userData = snapshot.val();
          if (userData) {
            const { nombre, apellido } = userData;
            validateStockAndService(uid, nombre, apellido);
          } else {
            Alert.alert(
              "Error",
              "No se encontraron datos del usuario."
            );
          }
        });
      } else {
        Alert.alert(
          "Advertencia",
          "Debe iniciar sesión para solicitar un préstamo."
        );
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error al obtener el UID desde SecureStore:", error);
    }
  };
  
  const handleAddToCart = () => {
    fetchUserMainData();
  };

  const validateStockAndService = async (userUID, name, lastname) => {
    if (quantityRequested > 0 && productDetail.stock > 0) {
      addToCartFirebaseInProgress(productDetail, quantityRequested, userUID, name, lastname)
        .then((success) => {
          if (success) {
            Alert.alert("Éxito", "Producto agregado al carrito.", [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("ClientLoansNavigator", {
                    screen: "Home",
                  });
                },
              },
            ]);
          } else {
            Alert.alert(
              "Advertencia",
              "El producto está agotado. No se puede solicitar un préstamo."
            );
          }
        })
        .catch((error) => {
          console.error("Error al agregar al carrito:", error);
          Alert.alert(
            "Error",
            "Hubo un problema al agregar el producto al carrito."
          );
        });
    } else {
      Alert.alert(
        "Advertencia",
        "El producto está agotado. No se puede solicitar un préstamo.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("HomeNavigation", { screen: "HomeScreen" });
            },
          },
        ]
      );
    }
  }

  return (
    <View>
      <ScrollView>
        {/* Image carousel */}
        <FlatList
          data={productDetail.productID}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: productDetail.foto }}
            style={{ width, aspectRatio: 1 }}
          />
        </View>

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.name}>{productDetail.nombre}</Text>

          {/* Stock */}
          <Text style={styles.name}>Stock: {productDetail.stock}</Text>

          {/* ChangeStock */}
          <View style={styles.stock}>

            <TouchableOpacity onPress={handleDecreaseQuantity}>
              <AntDesign name="minuscircleo" size={20} />
            </TouchableOpacity>

            <Text> {quantityRequested} </Text>

            <TouchableOpacity onPress={handleIncreaseQuantity}>
              <AntDesign name="pluscircleo" size={20} />
            </TouchableOpacity>
          </View>

          {/* Marca */}
          <Text style={styles.description}>{productDetail.marca}</Text>

          {/* Add Cart Button */}
          <TouchableOpacity onPress={handleAddToCart} style={styles.button}>
            <Text style={styles.buttonText}>SOLICITAR PRÉSTAMO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },

  stock: {
    flexDirection: "row",

  },

  description: {
    marginVertical: 10,
    fontSize: 15,
    fontWeight: "300",
    lineHeight: 30,
  },
  button: {
    backgroundColor: "#071356",
    width: "80%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});