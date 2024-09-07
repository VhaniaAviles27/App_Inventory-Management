import { Text, View, Image } from 'react-native'
import React, {useState, useCallback } from 'react'
import firebase from '../../../../Firebase'
import { adminProfileStyle } from '../../../styles/adminStyles/AdminProfileStyle'
import { useFocusEffect } from "@react-navigation/native";

const AdminProfile = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);

    const fetchData = async () => {
      try {
        
        const usuarioActual = firebase.auth().currentUser;

        if (usuarioActual) {
          
          const snapshot = await firebase
            .database()
            .ref(`Users/${usuarioActual.uid}`)
            .once("value");

          const data = snapshot.val();
          
          if (data) {
            setUsuarioActual(data);
            
          }
        } else {
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario: ", error);
      }
    };
    useFocusEffect(
      useCallback(() => {
        fetchData();
      }, [])
    );
    


  if (!usuarioActual) {
    return <Text>Cargando...</Text>;
  }
  return (
    <View style={adminProfileStyle.container}>
      <View style={adminProfileStyle.card}>
        <Image source={{ uri: usuarioActual.foto }} style={adminProfileStyle.avatar} />
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'center',
            }}
          >
            <Text style={adminProfileStyle.userName}>{usuarioActual.nombre}</Text>
            <Text style={adminProfileStyle.userLastName}> {usuarioActual.apellido}</Text>
          </View>

          <Text style={adminProfileStyle.userEmail}>{usuarioActual.correo}</Text>
          <Text style={adminProfileStyle.userDetail}>
            Celular: +51 {usuarioActual.telefono}
          </Text>
          <Text style={adminProfileStyle.userDetail}>Área: {usuarioActual.area}</Text>
        </View>
      </View>
    </View>
  );
};

export default AdminProfile

