import { StyleSheet } from "react-native";

export const adminProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3,
  },
  avatar: {
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userLastName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    color: "gray",
  },
  userDetail: {
    marginTop: 5,
    color: "black",
  },
  editButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
