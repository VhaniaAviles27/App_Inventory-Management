import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { menuStyle } from '../../../styles/userStyles/MenuViewStyle.js';
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
      source={require("../../../../assets/background_color.jpg")}
      imageStyle={{ opacity: 0.8 }}
      style={menuStyle.backgroundContainer}
      resizeMode="cover"
    >
      <View style={menuStyle.columnContainer}>
        <View style={menuStyle.column}>
          <TouchableOpacity onPress={navigateLoansHome}>
            <View style={menuStyle.containerOption}>
              <Image
                style={menuStyle.iconOptionMenu}
                source={require("../../../../assets/iconLoans.png")}
              />
              <Text style={menuStyle.textRol}>Prestamos</Text>
            </View>
          </TouchableOpacity>

          <View style={menuStyle.containerOption}>
            <Image
              style={menuStyle.iconOptionMenu}
              source={require("../../../../assets/iconManuals.png")}
            />
            <Text style={menuStyle.textRol}>Guias de Usuario</Text>
          </View>
        </View>

        <View style={menuStyle.column}>
          <View style={menuStyle.containerOption}>
            <Image
              style={menuStyle.iconOptionMenu}
              source={require("../../../../assets/iconDatasheets.png")}
            />
            <Text style={menuStyle.textRol}>Datasheet</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Menu;
