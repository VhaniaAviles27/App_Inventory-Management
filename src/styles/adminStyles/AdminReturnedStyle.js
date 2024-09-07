import { StyleSheet } from "react-native";

export const adminReturnStyle = StyleSheet.create({
    registerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 16,
        backgroundColor: "#fff",
        width: "100%",
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
        marginTop: 15,
        padding: 20,
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
        fontSize: 15,
        color: "#333",
      },
      noLoansText: {
        fontSize: 18,
        color: "#555",
        textAlign: 'center',
      }
})