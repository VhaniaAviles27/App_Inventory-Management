import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { addToCartHistoryPerUser, denyLoan, fetchLoansByStatus } from "../extents/ExtentRequested";
import Spinner from "react-native-loading-spinner-overlay";

const Requested = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchLoansByStatus('PENDIENTE')
        .then(setLoans)
        .catch(console.error);
    }, [])
  );
  const handleAllow = (loan) => {
    setLoading(true);
    addToCartHistoryPerUser(loan, loan.cantidadSolicitada, loan.userUID)
      .then((result) => {
        if (result) {
          removeLoanFromUI(loan.id)
        } else {
          console.log("Error al actualizar el préstamo");
        }
      })
      .catch((error) => {
        console.error("Ocurrió un error durante la actualización del préstamo:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeny = (loanId) => {
    Alert.alert(
      "Validar Rechazo",
      "¿Estás seguro de que deseas denegar este préstamo?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Denegar", onPress: () => {
            denyLoan(loanId).then(result => {
              if (result) {
                removeLoanFromUI(loanId);
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  const removeLoanFromUI = (loanId) => {
    setLoans(currentLoans => currentLoans.filter(loan => loan.id !== loanId));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Listado de solicitudes</Text>
      {loans.map((loan, index) => (
        <View key={index} style={styles.registerContainer}>
          <View style={styles.registroPrestamo}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Fecha: {loan.fechaPrestamo}</Text>
              <Text style={styles.infoText}>Artículo: {loan.nombre}</Text>
              <Text style={styles.infoText}>Cantidad: {loan.cantidadSolicitada}</Text>
              <Text style={styles.infoText}>Solicitado por: {loan.nombreSolicitante} {loan.apellidoSolicitante}</Text>
            </View>
          </View>
          <View style={styles.buttonContent}>
            <TouchableOpacity
              style={styles.returnButtonAllow}
              onPress={() => handleAllow(loan)}>
              <Text style={styles.returnButtonText}>Permitir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.returnButtonDeny}
              onPress={() => handleDeny(loan.id)}>
              <Text style={styles.returnButtonText}>Denegar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {loans.length === 0 && <Text style={styles.noLoansText}>No hay solicitudes pendientes.</Text>}

      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  returnButtonAllow: {
    width: 150,
    backgroundColor: "#4CCD23",
    marginTop: 15,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  returnButtonDeny: {
    width: 150,
    backgroundColor: "#DC1111",
    marginTop: 15,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  registerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
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
  buttonContent: {
    flexDirection: "row",
  },

  container: {
    flex: 1,
    padding: 35,
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
    textAlign: "center",
  },
});

export default Requested;
