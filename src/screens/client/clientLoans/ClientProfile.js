import { Text, View, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { clientProfileStyle } from '../../../styles/clientStyles/ClientProfileStyle.js';
import firebase from '../../../../Firebase'
import { useFocusEffect } from "@react-navigation/native";

const ClientProfile = () => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  const fetchData = async () => {
    try {
      // Espera a que se haya iniciado sesión para obtener el usuario actual
      const usuarioActual = firebase.auth().currentUser;

      if (usuarioActual) {
        // Obtiene los detalles del usuario desde la base de datos
        const snapshot = await firebase
          .database()
          .ref(`Users/${usuarioActual.uid}`)
          .once("value");

        const data = snapshot.val();

        if (data) {
          setUsuarioActual(data);

        }
      } else {
        // El usuario no está autenticado, podrías redirigir a la pantalla de inicio de sesión
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
    // Puedes mostrar un indicador de carga u otra cosa mientras se obtienen los datos
    return <Text>Cargando...</Text>;
  }
  return (
    <View style={clientProfileStyle.container}>
      <View style={clientProfileStyle.card}>
        <Image source={{ uri: usuarioActual.foto }} style={clientProfileStyle.avatar} />
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'center',
            }}
          >
            <Text style={clientProfileStyle.userName}>{usuarioActual.nombre}</Text>
          </View>

          <Text style={clientProfileStyle.userDetail}>
            Celular: +51 {usuarioActual.telefono}
          </Text>
          <Text style={clientProfileStyle.userDetail}>Área: {usuarioActual.area}</Text>
        </View>

        {/* Puedes agregar acciones como editar perfil o cerrar sesión */}
        {/* <TouchableOpacity style={clientProfileStyle.editButton}>
          <Text style={clientProfileStyle.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity> */}
        
      </View>
    </View>
  );
};

export default ClientProfile
