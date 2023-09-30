import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'

const HomePage = () => {
  return (
    
    <SafeAreaView style={styles.container}>
        <ScrollView>

            <View style={styles.addContainer}>
                <CarouselCards />
                <AddDetail />
            </View>

            <View style={styles.addContainer}>
                <CarouselCards />
                <AddDetail />
            </View>

            <View style={styles.addContainer}>
                <CarouselCards />
                <AddDetail />
            </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage