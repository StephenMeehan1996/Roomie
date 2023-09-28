import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react'
import CarouselCards from '../components/CarouselCards'
import AddDetail from '../components/AddDetail'

const Home = () =>{
    return (
    <SafeAreaView style={styles.container}>
        <View>
           <CarouselCards />
           <AddDetail/>
        </View>
        
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    test: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15
    },
  });

export default Home;