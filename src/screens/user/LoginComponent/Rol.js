import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { rolStyle } from '../../../styles/userStyles/RolViewStyle.js';
import { useNavigation } from '@react-navigation/native';

const Rol = () => {
  const navigation = useNavigation();

  const navigateScreen = (userType) => {
    navigation.navigate("Menu", { userType });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/background_color.jpg")}
      imageStyle={{ opacity: 0.8 }}
      style={rolStyle.backgroundContainer}
      resizeMode="cover"
    >
      <View style={rolStyle.containerPrincipal}>
        <Text style={rolStyle.textSelectRol}>Escoja su Rol</Text>
        <TouchableOpacity onPress={() => navigateScreen("Admin")}>
          <View style={rolStyle.containerIcons}>
            <Image
              style={rolStyle.iconRolAdmin}
              source={require("../../../../assets/iconAdmin.png")}
            />
            <Text style={rolStyle.textRol}>Administrador</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateScreen("User")}>
          <View style={rolStyle.containerIcons}>
            <Image
              style={rolStyle.iconRolUser}
              source={require("../../../../assets/iconUser.png")}
            />
            <Text style={rolStyle.textRol}>Usuario</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


export default Rol
