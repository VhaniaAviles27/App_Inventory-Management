import { StyleSheet, Text, View, FlatList } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Devoluciones</Text>
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
                    </View>
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
    fontWeight: "750",
    fontSize: 15,
    color: "#333",
  },
  noLoansText: {
    fontSize: 18,
    color: "#555",
    textAlign: 'center',
  },
});

export default ReturnRegistration;