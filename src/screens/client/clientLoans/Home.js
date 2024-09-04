import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ProductCard from '../../../components/ProductCard'
import SearchFilter from '../../../components/SearchFilter';

const Home = () => {
    const [filterText, setFilterText] = useState("");
    const handleFilterChange = (text) => {
        setFilterText(text);
    };

    return (
        <View contentContainerStyle={styles.container}>

            <SearchFilter
                icon="search"
                placeholder={"Buscando..."}
                onFilterChange={handleFilterChange}
                color = "white"
            />
            <View>
                <ProductCard filterText={filterText} />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        marginHorizontal: 10,
        paddingTop: 40,
    },
    productView: {
        flex: 1,
    },
});
