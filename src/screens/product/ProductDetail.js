import { Alert, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { addToCartFirebaseInProgress } from '../../components/CartLoans';
import { productStyle } from '../../styles/productStyles/ProductViewStyle.js';
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import 'firebase/database';
import * as SecureStore from "expo-secure-store";
import firebase from '../../../Firebase.js';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  // Función Calendario

  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [formattedDateDevolution, setFormattedDateDevolution] = useState('');

  const handleDateChange = (event, selectedDate) => {
    setShowCalendar(false); 
    if (selectedDate) {
      setDate(selectedDate);
      const formatted = selectedDate.toLocaleDateString(); 
      setFormattedDateDevolution(formatted);
    }
  };

  const showDatePicker = () => {
    setShowCalendar(true); 
  };

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

  const validateStockAndService = async (userUID, name) => {
    if (quantityRequested > 0 && productDetail.stock > 0) {
      addToCartFirebaseInProgress(productDetail, quantityRequested, userUID, name, formattedDateDevolution)
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
        <FlatList
          data={productDetail.productID}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={productStyle.imageContainer}>
          <Image
            source={{ uri: productDetail.foto }}
            style={{ width, aspectRatio: 1 }}
          />
        </View>

        <View style={{ padding: 20 }}>
          <Text style={productStyle.name}>{productDetail.nombre}</Text>
          <Text style={productStyle.modelo}>{productDetail.modelo}</Text>
          <Text style={productStyle.categoria}>Categoría: {productDetail.categoria}</Text>
          <Text style={productStyle.ubicación}>Ubicación: {productDetail.ubicación}</Text>
          <Text style={productStyle.marca}>Marca: {productDetail.marca}</Text>
          <Text style={productStyle.stock}>Stock: {productDetail.stock}</Text>

          {/* ChangeStock */}
          <View style={productStyle.cantidad}>
            <Text style = {productStyle.textoCantidad}>Cantidad Solicitada:   </Text>
            <TouchableOpacity onPress={handleDecreaseQuantity} >
              <AntDesign name="minuscircleo" size={20} />
            </TouchableOpacity>

            <Text>   {quantityRequested}   </Text>

            <TouchableOpacity onPress={handleIncreaseQuantity}>
              <AntDesign name="pluscircleo" size={20} />
            </TouchableOpacity>
          </View>
          
          <Text style={productStyle.fecha}>Fecha de devolución: </Text>
          <View style={productStyle.inputFecha}>
            <TextInput 
            placeholder='Ingrese una fecha de devolución'
            value={formattedDateDevolution} 
            editable={false}
            />
            <TouchableOpacity onPress={showDatePicker}>
              <Entypo style={productStyle.simbolo} name = "calendar"/>
            </TouchableOpacity>    
          </View>

          {showCalendar && (
          <DateTimePicker
            value={date}
            mode="date"
            display= "default"
            onChange={handleDateChange}
          />
          )}
          
          <TouchableOpacity onPress={handleAddToCart} style={productStyle.button}>
            <Text style={productStyle.buttonText}>SOLICITAR PRÉSTAMO</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductDetail;

