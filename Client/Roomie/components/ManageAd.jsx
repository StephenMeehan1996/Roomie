//import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions,TextInput,ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { calculateReviewStats, digsMeals, returnSelectedProfileImage,returnSelectedCoverImage, generateUUID } from '../functions/CommonFunctions';
import  styles  from '../styles/common.style';
import callLambdaFunction from '../functions/PostAPI';
import  formStyles  from '../styles/formStyle.style';



const ManageAd = ({navigation, route, ad}) => {
  return (
    <View>
       <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                    <Title>Manage Ad</Title>
                </View>
                
              </Card.Content>
            </Card>
    </View>
  )
}

export default ManageAd