import { StyleSheet } from "react-native";

export const productStyle = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight:"bold",
    marginVertical: 15,
  },
  modelo: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "semibold",
  },

  categoria:{
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "semibold",
  },
  ubicación: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  marca:{
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "semibold",
  },
  stock: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },
  textoCantidad: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "semibold",
  },
  cantidad: {
    flexDirection: "row",
    fontSize: 15,
    marginBottom: 5,
  },

  fecha: {
    flexDirection: "row",
    fontSize: 15,
    marginBottom: 12,
  },
  inputFecha: {
    backgroundColor: "rgba(225,225,225, 1)",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    borderColor: "rgb(0,0,0)",
    borderWidth: 0.5,
    elevation: 1,
    padding: 8,
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 15,
  },
  devolucion:{
    alignItems: "center",
  },

  simbolo: {
    marginLeft: 115,
    fontSize: 18,
  },

  button: {
    backgroundColor: "#071356",
    width: "80%",
    alignSelf: "center",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
