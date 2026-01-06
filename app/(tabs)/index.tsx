import Header from '@/components/Header'
// import ProductItem from '@/components/ProductItem'
import ProductList from '@/components/ProductList'
// import { Colors } from '@/constants/Colors'
import { ProductType } from '@/types/type'
import axios from 'axios'
import { Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
// import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {}

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const URL = `http://192.168.31.220:8000/products`;
    const response = await axios.get(URL)

    console.log(response.data)
    setProducts(response.data);
    setIsLoading(false);
  }

  return (
    <>
    <Stack.Screen options={{
      headerShown: true, header: () => <Header />
    }} />
        <ProductList products={products} />
    </>
  )
}

export default HomeScreen

// const styles = StyleSheet.create({
  
// });