import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Rol = () => {
  const navigation = useNavigation();

  const navigateScreen = (userType) => {
    navigation.navigate("Menu", { userType });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/fondo.jpg")}
      imageStyle={{ opacity: 0.25 }}
      style={styles.backgroundContainer}
      resizeMode="cover"
    >
      <View style={styles.containerPrincipal}>
        <Text style={styles.textSelectRol}>Escoja su Rol</Text>
        <TouchableOpacity onPress={() => navigateScreen("Admin")}>
          <View style={styles.containerIcons}>
            <Image
              style={styles.iconRolAdmin}
              source={require("../../../../assets/iconAdmin.png")}
            />
            <Text style={styles.textRol}>Administrador</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateScreen("User")}>
          <View style={styles.containerIcons}>
            <Image
              style={styles.iconRolUser}
              source={require("../../../../assets/iconUser.png")}
            />
            <Text style={styles.textRol}>Usuario</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


export default Rol

const styles = StyleSheet.create({
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  containerPrincipal: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: "60%",
    height: "60%",  

  },
  containerIcons: {
    padding: 10,
  },
  iconRolAdmin: {
    width: 150,
    height: 150,
  },
  iconRolUser: {
    width: 145,
    height: 100,
  },
  textRol: {
    textAlign: "center",
    padding: 10,
  },
  textSelectRol:{
    opacity: 0.5,
  }
});
