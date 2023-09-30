import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const windowWidth = Dimensions.get('window').width;

const CarouselCardItem = ({ item, index }) => {
  return (
    <ScrollView 
      style={styles.container} key={index}
      showsHorizontalScrollIndicator={false}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 30,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 180, // Set your desired image height
    resizeMode: 'cover',
  }
})

export default CarouselCardItem