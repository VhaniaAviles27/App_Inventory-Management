import { Text, View, FlatList } from "react-native";
import { clientReturnedStyle } from "../../../styles/clientStyles/ClientReturnedStyle.js";
import React, { useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import firebase from "../../../../Firebase";
import { useFocusEffect } from "@react-navigation/native";

const ReturnRegistration = () => {
  const [storedUserID, setStoredUserID] = useState(null);
  const [loans, setLoans] = useState([]);

  const fetchUserUID = async () => {
    try {
      const storedUserUID = await SecureStore.getItemAsync("userUID");
      setStoredUserID(storedUserUID);
      const loansRef = firebase.database().ref("LoansReturns");
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

  return (
    <View style={clientReturnedStyle.container}>
      <Text style={clientReturnedStyle.header}>Historial de Devoluciones</Text>
      {storedUserID && (
        <View>
          {loans.length > 0 ? (
            <FlatList
              data={loans}
              keyExtractor={(item) => item.loansHistoryID}
              renderItem={({ item }) => (
                <View style={clientReturnedStyle.registerContainer}>
                  <View style={clientReturnedStyle.registroPrestamo}>
                    <View style={clientReturnedStyle.infoContainer}>
                      <Text style={clientReturnedStyle.infoText}>Fecha: {item.fechaPrestamo}</Text>
                      <Text style={clientReturnedStyle.infoText}>Artículo: {item.nombre}</Text>
                      <Text style={clientReturnedStyle.infoText}>
                        Cantidad: {item.cantidadSolicitada}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text style={clientReturnedStyle.noLoansText}>No hay préstamos registrados</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ReturnRegistration;