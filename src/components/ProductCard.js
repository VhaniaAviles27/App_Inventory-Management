import { Alert, StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { productCardStyle } from '../styles/productStyles/ProductCardViewStyle.js';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import firebase from '../../Firebase';
import 'firebase/database';

const ProductCard = ({ filterText }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const filteredData = data.filter((productDetail) => {
    return productDetail.nombre
      .toLowerCase()
      .includes(filterText.toLowerCase());
  });

  const fetchData = async () => {
    try {
      const snapshot = await firebase.database().ref("Products").once("value");
      const dataObject = snapshot.val();
      if (dataObject) {
        const dataArray = Object.values(dataObject);
        setData(dataArray);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar los datos");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("ProductDetail", { productDetail: item })}
      style={productCardStyle.itemContainer}
    >
      <View>
        <View style={productCardStyle.card}>
          <Image source={{ uri: item.foto }} style={productCardStyle.image} />
          <Text style={productCardStyle.priceText}>{item.nombre}</Text>
          <Text style={productCardStyle.titleText}>Stock: {item.stock}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.productID.toString()}
      renderItem={renderItem}
      numColumns={2}
    />
  );
}

export default ProductCard
