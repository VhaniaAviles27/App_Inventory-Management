import { StyleSheet } from "react-native";

export const adminRequestedStyle = StyleSheet.create({
  returnButtonAllow: {
    width: 150,
    backgroundColor: "#4CCD23",
    marginTop: 6,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  returnButtonDeny: {
    width: 150,
    backgroundColor: "#DC1111",
    marginTop: 6,
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
    fontWeight: "semibold",
    marginBottom: 1,
    fontSize: 14,
    color: "#333",
  },
  noLoansText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
  },
});
