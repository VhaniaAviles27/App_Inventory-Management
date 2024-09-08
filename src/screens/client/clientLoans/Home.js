import { View } from 'react-native'
import React, { useState } from 'react'
import { clientHomeStyle } from '../../../styles/clientStyles/ClientHomeStyle.js';
import ProductCard from '../../../components/ProductCard'
import SearchFilter from '../../../components/SearchFilter';

const Home = () => {
    const [filterText, setFilterText] = useState("");
    const handleFilterChange = (text) => {
        setFilterText(text);
    };

    return (
        <View contentContainerStyle={clientHomeStyle.container}>

            <SearchFilter
                icon="search"
                placeholder={"Buscando..."}
                onFilterChange={handleFilterChange}
                color = "white"
            />
            <View style = {{paddingBottom:160}}>
                <ProductCard filterText={filterText} />
            </View>
        </View>
    )
}

export default Home
