import { Text, View } from "react-native";
import { adminReturnStyle } from "../../../styles/adminStyles/AdminReturnedStyle.js";
import React from "react";


const ReturnList = () => {
  return (
    <View style={adminReturnStyle.container}>
      <Text style={adminReturnStyle.header}>Listado de Devoluciones</Text>
      <View style={adminReturnStyle.registerContainer}>
        <View style={adminReturnStyle.registroPrestamo}>
          <View style={adminReturnStyle.infoContainer}>
            <Text style={adminReturnStyle.infoText}>Fecha:</Text>
            <Text style={adminReturnStyle.infoText}>Artículo: </Text>
            <Text style={adminReturnStyle.infoText}>Cantidad:</Text>
            <Text style={adminReturnStyle.infoText}>Devuelto por:</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReturnList;