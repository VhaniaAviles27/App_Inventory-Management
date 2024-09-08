import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { clientLoanStyle } from "../../../styles/clientStyles/ClientLoansStyle.js";
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
      const loanToReturn = loans.find((loan) => loan.loansHistoryID === itemId);

      const returnsRef = firebase.database().ref("LoansReturns");

      const currentDate = new Date();
      const formattedDate = `${currentDate.toISOString().slice(0, 10)} ${currentDate.getHours()}:${currentDate.getMinutes()}`;

      const newReturn = await returnsRef.push({
        estado: "DEVUELTO",
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
    <View style={clientLoanStyle.container}>
      <Text style={clientLoanStyle.header}>Historial de Préstamos</Text>
      {storedUserID && (
        <View>
          {loans.length > 0 ? (
            <FlatList
              data={loans}
              keyExtractor={(item) => item.loansHistoryID}
              renderItem={({ item }) => (
                <View style={clientLoanStyle.registerContainer}>
                  <View style={clientLoanStyle.registroPrestamo}>
                    <View style={clientLoanStyle.infoContainer}>
                      <Text style={clientLoanStyle.infoText}>Fecha: {item.fechaPrestamo}</Text>
                      <Text style={clientLoanStyle.infoText}>Artículo: {item.nombre}</Text>
                      <Text style={clientLoanStyle.infoText}>
                        Cantidad: {item.cantidadSolicitada}
                      </Text>
                      <Text style={clientLoanStyle.infoText}>Fecha de devolución: {item.fechaDevolucion}</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={clientLoanStyle.returnButton}
                      onPress={() => showReturnAlert(item.loansHistoryID)}
                    >
                      <Text style={clientLoanStyle.returnButtonText}>
                        DEVOLUCIÓN
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={clientLoanStyle.noLoansText}>No hay préstamos registrados</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default LoansRegistration;
