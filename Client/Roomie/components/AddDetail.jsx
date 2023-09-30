import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react'

const AddDetail = () =>{
    return (
    <View style={styles.container}>
         <Text style={styles.header}>5A Upper John Street,</Text>
         <Text style={[styles.header, styles.margin]}>Sligo Town, Co.Sligo</Text>
         <Text style={[styles.title, styles.margin]}>Charming Sligo Apartment with Scenic Views</Text>
         <Text style={styles.body}>This delightful two-bedroom apartment is nestled in the heart of Sligo, offering a perfect blend of comfort and convenience....</Text>
    </View>
    )
}
const styles = StyleSheet.create({
    header: {
      color: "#222",
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 20
    },
    title: {
        color: "#222",
        fontSize: 13,
        fontWeight: "bold",
        paddingLeft: 20
      },
    margin: {
        marginBottom: 5
      },
    body: {
      color: "#222",
      fontSize: 12,
      paddingLeft: 20,
      paddingLeft: 20,
      paddingRight: 20
    }
  })

export default AddDetail;