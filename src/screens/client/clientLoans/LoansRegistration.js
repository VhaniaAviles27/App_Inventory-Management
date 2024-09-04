import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import firebase from "../../../../Firebase";
import { useFocusEffect } from "@react-navigation/native";

const LoansRegistration = () => {
  const [storedUserID, setStoredUserID] = useState(null);
  const [loans, setLoans] = useState([]);

  const fetchUserUID = async () => {
    try {
      const storedUserUID = await SecureStore.getItemAsync("userUID");
      setStoredUserID(storedUserUID);
      const loansRef = firebase.database().ref("LoansHistory");
      loansRef
        .orderByChild("userUID")
        .equalTo(storedUserUID)
        .once("value", (snapshot) => {
          const loansData = snapshot.val()
            ? Object.values(snapshot.val())
            : [];
          setLoans(loansData);

        });
    } catch (error) {
      console.error("Error al recuperar el UserUID de SecureStore:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserUID();
    }, [])
  );

  const showReturnAlert = (itemId) => {
    Alert.alert(
      'Devolución',
      '¿Desea proceder con la devolución?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => handleReturnAction(itemId),
        },
      ],
      { cancelable: false }
    );
  };

  const handleReturnAction = async (itemId) => {
    try {
      // 1. Obtener la información del préstamo basado en loansHistoryID
      const loanToReturn = loans.find((loan) => loan.loansHistoryID === itemId);

      // 2. Crear una nueva entrada en LoansReturns
      const returnsRef = firebase.database().ref("LoansReturns");

      const currentDate = new Date();
      const formattedDate = `${currentDate.toISOString().slice(0, 10)} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

      const newReturn = await returnsRef.push({
        categoria: loanToReturn.categoria,
        foto: loanToReturn.foto,
        estado: "DEVUELTO",
        marca: loanToReturn.marca,
        modelo: loanToReturn.modelo,
        nombre: loanToReturn.nombre,
        productID: loanToReturn.productID,
        cantidadSolicitada: loanToReturn.cantidadSolicitada,
        userUID: loanToReturn.userUID,
        fechaPrestamo: loanToReturn.fechaPrestamo,
        fechaDevolucion: formattedDate,
      });

      const loansReturnID = newReturn.key;

      await newReturn.update({
        loansReturnID: loansReturnID,
      });

      // 4. Actualizar el stock en Products
      const productID = loanToReturn.productID;
      const stockSnapshot = await firebase.database().ref(`Products/${productID}/stock`).once("value");
      const currentStock = parseInt(stockSnapshot.val()) || 0;

      await firebase.database().ref(`Products/${productID}`).update({
        stock: currentStock + loanToReturn.cantidadSolicitada,
      });

      // 4. Eliminar la entrada en LoansHistory por loansHistoryID
      const loansRef = firebase.database().ref("LoansHistory");
      await loansRef.child(itemId).remove();

      // 5. Actualizar la UI eliminando el elemento de la lista
      setLoans(loans.filter((loan) => loan.loansHistoryID !== itemId));

      // 6. Mensaje de éxito o acciones adicionales según tus necesidades
      Alert.alert('Devolución Exitosa', 'El producto ha sido devuelto con éxito.');
    } catch (error) {
      console.error('Error durante la devolución:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Préstamos</Text>
      {storedUserID && (
        <View>
          {loans.length > 0 ? (
            <FlatList
              data={loans}
              keyExtractor={(item) => item.loansHistoryID}
              renderItem={({ item }) => (
                <View style={styles.registerContainer}>
                  <View style={styles.registroPrestamo}>
                    <View style={styles.infoContainer}>
                      <Text style={styles.infoText}>Fecha: {item.fechaPrestamo}</Text>
                      <Text style={styles.infoText}>Artículo: {item.nombre}</Text>
                      <Text style={styles.infoText}>
                        Cantidad: {item.cantidadSolicitada}
                      </Text>
                      {/* Agregar la fecha hasta la que pidió el préstamo */}
                      {/* <Text style={styles.infoText}>
                        Fecha de devolución: {item.cantidadSolicitada}
                      </Text> */}
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.returnButton}
                      onPress={() => showReturnAlert(item.loansHistoryID)}
                    >
                      <Text style={styles.returnButtonText}>
                        Devolucion?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noLoansText}>No hay préstamos registrados</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  returnButton: {
    width: 350,
    backgroundColor: '#071356',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },

  registroPrestamo: {
    flexDirection: "row",
  },

  infoContainer: {
    flex: 1,
  },

  infoText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#333",
  },

  noLoansText: {
    fontSize: 18,
    color: "#555",
    textAlign: 'center',
  },
});

export default LoansRegistration;
