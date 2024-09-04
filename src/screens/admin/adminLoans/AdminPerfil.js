import { StyleSheet, Text, View, Image } from 'react-native'
import React, {useState, useCallback } from 'react'
import firebase from '../../../../Firebase'
import { useFocusEffect } from "@react-navigation/native";

const AdminPerfil = () => {
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
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: usuarioActual.foto }} style={styles.avatar} />
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: 'center',
            }}
          >
            <Text style={styles.userName}>{usuarioActual.nombre}</Text>
            <Text style={styles.userLastName}> {usuarioActual.apellido}</Text>
          </View>

          <Text style={styles.userEmail}>{usuarioActual.correo}</Text>
          <Text style={styles.userDetail}>
            Celular: +51 {usuarioActual.telefono}
          </Text>
          <Text style={styles.userDetail}>Área: {usuarioActual.area}</Text>
        </View>
      </View>
    </View>
  );
};

export default AdminPerfil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  avatar: {
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userLastName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: 'gray',
  },
  userDetail: {
    marginTop: 5,
    color: 'black',
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});