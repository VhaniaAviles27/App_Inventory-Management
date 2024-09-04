import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Menu = ({route}) => {
  const storedUser = route;
  const navigation = useNavigation();
  const [storedUserType, setStoredUserType] = useState(null);
  const fetchUserType = async () => {
    try {
      /** Puede ser null o undefined ==*/ 
      if (storedUser.params == null) {
       const storedUserNotNull = "User"
        setStoredUserType(storedUserNotNull);
        return;
      }
      setStoredUserType(storedUser.params.userType);
    } catch (error) {
      console.error("Error al recuperar el UserUID de SecureStore:", error);
    }
  };
  const navigateLoansHome = () => {
    if (storedUserType === "Admin") {
      navigation.navigate("AdminLoansNavigation");
    } else {
      navigation.navigate("ClientLoansNavigation");
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchUserType();
    }, [])
  );


  // si yo escogí el rol admin, voy a navegar a AdminLoansNavigation, si yo escogí el rol client, voy a navegar a ClientLoansNavigation

  return (
    <ImageBackground
      source={require("../../../../assets/fondo.jpg")}
      imageStyle={{ opacity: 0.25 }}
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <View style={styles.columnContainer}>
        <View style={styles.column}>
          <TouchableOpacity onPress={navigateLoansHome}>
            <View style={styles.containerOption}>
              <Image
                style={styles.iconOptionMenu}
                source={require("../../../../assets/iconLoans.png")}
              />
              <Text style={styles.textRol}>Prestamos</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.containerOption}>
            <Image
              style={styles.iconOptionMenu}
              source={require("../../../../assets/iconManuals.png")}
            />
            <Text style={styles.textRol}>Guias de Usuario</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.containerOption}>
            <Image
              style={styles.iconOptionMenu}
              source={require("../../../../assets/iconDatasheets.png")}
            />
            <Text style={styles.textRol}>Datasheet</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Menu;

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  
  columnContainer: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "80%",
  },

  column: {
    flex: 1, 
  },

  containerOption: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
  },

  iconOptionMenu:{
    width: 120,
    height: 120,
  },

  textRol: {
    textAlign: "center",
  },

  textSelectRol:{
    opacity: 0.5,
  }
});
