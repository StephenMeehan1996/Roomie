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

const RentalHistory = ({ navigation, route }) => {

    const [selectedTab, setSelectedTab] = useState('Tab1');
    const { signedInUserDetails, profileImage } = useAppContext();
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility

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

                            </Card.Content>
                        </Card>
                    </View>
                );
            case 'Tab2':
                return (
                    <View style={styles.tabContent}>
                        <Card elevation={5} style={styles.card}>
                            <Card.Content>
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
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop : 50 }}>
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
});

export default RentalHistory