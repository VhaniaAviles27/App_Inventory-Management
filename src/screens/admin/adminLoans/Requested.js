import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { adminRequestedStyle } from "../../../styles/adminStyles/AdminRequestedStyle.js";
import { Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
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
    <ScrollView style={adminRequestedStyle.container}>
      <Text style={adminRequestedStyle.header}>Listado de solicitudes</Text>
      {loans.map((loan, index) => (
        <View key={index} style={adminRequestedStyle.registerContainer}>
          <View style={adminRequestedStyle.registroPrestamo}>
            <View style={adminRequestedStyle.infoContainer}>
              <Text style={adminRequestedStyle.infoText}>Fecha: {loan.fechaPrestamo}</Text>
              <Text style={adminRequestedStyle.infoText}>Artículo: {loan.nombre}</Text>
              <Text style={adminRequestedStyle.infoText}>Cantidad: {loan.cantidadSolicitada}</Text>
              <Text style={adminRequestedStyle.infoText}>Solicitado por: {loan.nombreSolicitante} {loan.apellidoSolicitante}</Text>
            </View>
          </View>
          <View style={adminRequestedStyle.buttonContent}>
            <TouchableOpacity
              style={adminRequestedStyle.returnButtonAllow}
              onPress={() => handleAllow(loan)}>
              <Text style={adminRequestedStyle.returnButtonText}>Permitir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={adminRequestedStyle.returnButtonDeny}
              onPress={() => handleDeny(loan.id)}>
              <Text style={adminRequestedStyle.returnButtonText}>Denegar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {loans.length === 0 && <Text style={adminRequestedStyle.noLoansText}>No hay solicitudes pendientes.</Text>}

      <Spinner
        visible={loading}
        textContent={"Cargando..."}
        textStyle={{ color: "#FFF" }}
      />
    </ScrollView>
  );
};

export default Requested;
