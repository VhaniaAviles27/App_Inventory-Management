import { Alert, StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
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
      style={styles.itemContainer}
    >
      <View>
        <View style={styles.card}>
          <Image source={{ uri: item.foto }} style={styles.image} />
          <Text style={styles.priceText}>{item.nombre}</Text>
          <Text style={styles.titleText}>Stock: {item.stock}</Text>
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

const styles = StyleSheet.create({

  card: {
    alignContent: "center",
    borderRadius: 5,
    paddingTop: 5,
    paddingHorizontal: 5,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#071356",
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    borderRadius: 5,
    aspectRatio: 1,
    marginBottom: 5,
  },
  priceText: {
    flex: 1,
    paddingVertical: 0,
    color: "white",
    textAlign: 'center',
  },
  titleText: {
    flex: 1,
    paddingVertical: 0,
    color: "white",
    fontWeight: '900',
  },
})