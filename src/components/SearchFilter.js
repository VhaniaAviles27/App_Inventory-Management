import { StyleSheet, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

const SearchFilter = ({ icon, placeholder, onFilterChange }) => {
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (text) => {
    setSearchText(text);
    onFilterChange(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <FontAwesome name={icon} size={22} style={styles.icon} />
        <TextInput
          style={styles.inputText}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          value={searchText}
        />
      </View>
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "rgba(17, 21, 94, 0.85)",
    borderRadius: 5,
    margin: 2,
    paddingVertical: 8,
  },
  icon: {
    paddingHorizontal: 15,
    color: "white",
  },
  inputText: {
    flex: 1,
    color: "white",
  },
});
