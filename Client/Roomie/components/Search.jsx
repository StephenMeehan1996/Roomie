import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'



const Search = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false, 
        });
      }, [navigation]);

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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5
    },
    addContainer: {
        //backgroundColor: '#f5f5f5', // Slightly off-white color
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.2)', // Cool box shadow color
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10, // Blur radius for the box shadow
        paddingHorizontal: 7,
        paddingVertical: 15, // Adjust the padding as needed
        borderRadius: 8, // Optional: Add rounded corners
        marginBottom: 10
      }
  });

export default Search