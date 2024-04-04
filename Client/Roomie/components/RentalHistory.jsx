import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card, IconButton, MD3Colors, Chip, Avatar, Subheading } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { calculateReviewStats, digsMeals, returnSelectedProfileImage, returnSelectedCoverImage, generateUUID, writeNotification, handleChat } from '../functions/CommonFunctions';
import styles from '../styles/common.style';
import callLambdaFunction from '../functions/PostAPI';
import formStyles from '../styles/formStyle.style';
import ManageAd from './ManageAd';
import AdApplications from './AdApplications';
import { useAppContext } from '../Providers/AppContext';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AntDesign } from '@expo/vector-icons';

const RentalHistory = ({ navigation, route }) => {
    //npm i react-native-ratings
    const [selectedTab, setSelectedTab] = useState('Tab1');
    const { signedInUserDetails, profileImage } = useAppContext();
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [rentalHistory, setRentalHistory] = useState([])

    const [selected, setSelected] = useState(null);

    const handleSelect = (value) => {
        setSelected(value);
    };

    const ratingCompleted = (rating) => {

        setRating(rating);
    }

    const handleSubmit = () => {
        // Handle form submission
        console.log('Rating:', rating);
        console.log('Title:', title);
        console.log('Description:', description);
    };

    const renderTabContent = () => {
        switch (selectedTab) {

            case 'Tab1':
                return (
                    <View style={styles.tabContent}>
                        <Card elevation={5} style={styles.card}>
                            <Card.Content>
                                {rentalHistory && rentalHistory.filter(item => item.status === 0).length > 0 ? (
                                    <View>
                                        {/* Content to render when showForm is true */}
                                    </View>
                                ) : (
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
                                        <Title>No rental requests pending</Title>
                                    </View>
                                )}
                            </Card.Content>
                        </Card>
                    </View>
                );
            case 'Tab2':
                return (
                    <View style={styles.tabContent}>
                        <Card elevation={5} style={styles.card}>
                            <Card.Content>

                                {rentalHistory && rentalHistory.filter(item => item.status === 1).length > 0 ? (
                                    <View>
                                        {/* Content to render when showForm is true */}
                                    </View>
                                ) : (
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>

                                        <View style={styles2.thumbContainer}>
                                        <TouchableOpacity
                                            style={[styles2.thumbButtonGreen, selected === 'up' && styles2.selected]}
                                            onPress={() => handleSelect('up')}
                                        >
                                            <AntDesign name="like2" size={22} color={selected === 'up' ? 'white' : 'black'} />
                                          
                                            
                                            <Text style={[styles2.textGreen, selected === 'up' && styles2.text]}>Positive</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles2.thumbButtonRed, selected === 'down' && styles2.selectedRed]}
                                            onPress={() => handleSelect('down')}
                                        >
                                            <AntDesign name="dislike2" size={22} color={selected === 'down' ? 'white' : 'black'} />
                                            <Text style={[styles2.textRed, selected === 'down' && styles2.text]}>Negative</Text>
                                        </TouchableOpacity>
                                       

                                        </View>
                                        {/* <Title>No rental history</Title> */}
                                    
                                    </View>
                                )}

                                {showForm && (
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 50 }}>
                                        <IconButton
                                            icon="close-box"
                                            iconColor="red"
                                            size={40}
                                            onPress={() => setShowForm(false)}
                                        />
                                    </View>
                                )}
                                <View style={[styles2.container]}>
                                    {!showForm && (
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 50 }}>
                                            <Button mode="contained" onPress={() => setShowForm(true)} style={styles2.button}>
                                                Write a Review
                                            </Button>
                                        </View>
                                    )}
                                    {showForm && ( // Conditionally render the form
                                        <View >


                                            <Title style={{ textAlign: 'center' }}>User Review</Title>

                                            <Rating
                                                showRating
                                                onFinishRating={ratingCompleted}
                                                imageSize={30}
                                                style={{ paddingVertical: 10 }}
                                            />
                                            <TextInput
                                                label="Title"
                                                value={title}
                                                onChangeText={setTitle}
                                                mode="outlined"
                                                style={styles2.input}
                                                placeholder='Enter Review Title'
                                            />
                                            <TextInput
                                                label="Description"
                                                value={description}
                                                onChangeText={setDescription}
                                                mode="outlined"
                                                multiline
                                                numberOfLines={4}
                                                style={styles2.input}
                                                placeholder='Enter Review Details'
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                <Button mode="contained" onPress={handleSubmit} style={styles2.button}>
                                                    Submit
                                                </Button>
                                            </View>
                                        </View>
                                    )}
                                </View>


                            </Card.Content>
                        </Card>
                    </View>


                );
            default:
                return null;
        }
    };

    return (
        <ScrollView>
            <View >
                <Card elevation={5} style={styles.card}>
                    <Card.Content>
                        <View style={styles.header}>
                            <Title>Rental History</Title>
                            <IconButton
                                icon="arrow-left"
                                mode="text"
                                size={30}
                                style={{ flex: 1, alignItems: 'flex-end' }}
                                onPress={() => navigation.goBack()}>
                            </IconButton>

                        </View>
                    </Card.Content>


                </Card>

                <View style={styles.tabButtons}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedTab === 'Tab1' && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedTab('Tab1')}
                    >
                        <Text>Pending</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedTab === 'Tab2' && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedTab('Tab2')}
                    >
                        <Text>Confirmed</Text>

                    </TouchableOpacity>

                </View>

                {renderTabContent()}
            </View>
        </ScrollView>
    )
}

const styles2 = StyleSheet.create({

    showButton: {
        marginBottom: 20,
    },
    rating: {
        marginVertical: 10,
        alignSelf: 'center',
    },
    input: {
        marginBottom: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        padding: 10,
        elevation: 2
    },
    button: {
        marginTop: 20,
        width: 150,
        borderRadius: 0,

    },
    thumbButtonRed: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'red',
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    thumbButtonGreen: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'green',
        marginHorizontal: 10,
        backgroundColor: 'transparent',
    },
    selected: {
        backgroundColor: 'green', // Change to your preferred selected color
    },
    selectedRed: {
        backgroundColor: 'red', // Change to your preferred selected color
    },
    text: {
        marginLeft: 5,
        color: 'white',
        fontWeight: 'bold'
    },
    textGreen: {
        marginLeft: 5,
        color: 'green',
        fontWeight: 'bold'
    },
    textRed: {
        marginLeft: 5,
        color: 'red',
        fontWeight: 'bold'
    },
    thumbContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

export default RentalHistory