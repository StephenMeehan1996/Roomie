import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.slide} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 1, // changes height after snap
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200, // Set your desired image height
    resizeMode: 'cover',
  }
})

export default CarouselCardItem