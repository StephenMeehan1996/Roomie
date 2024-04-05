import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card, IconButton, MD3Colors, Chip, Avatar, Subheading } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { returnAdTypeText, references, smoking } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import { convertToDateTimeString } from '../functions/CommonFunctions';
import styles from '../styles/common.style';
import callLambdaFunction from '../functions/PostAPI';
import formStyles from '../styles/formStyle.style';
import ManageAd from './ManageAd';
import AdApplications from './AdApplications';
import { useAppContext } from '../Providers/AppContext';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AntDesign } from '@expo/vector-icons';
import { Formik, Form, Field, useFormikContext } from 'formik';
import * as Yup from 'yup';

//https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUserReviews?id=6ed81d5b-e317-47bb-bcfa-27596a754252
//https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetRentalHistory?id=d1691d88-7ab9-42bb-8ec1-8fa562909f68


const RentalHistory = ({ navigation, route }) => {
    //npm i react-native-ratings
    const [selectedTab, setSelectedTab] = useState('Tab1');
    const [selectedParentTab, setSelectedParentTab] = useState('Tab1');
    const { signedInUserDetails, profileImage } = useAppContext();
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form visibility
    const [rentalHistory, setRentalHistory] = useState([])
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState([]);

    //form 
    const [reviewFormName, setReviewFromName] = useState('');
    const [reviewFormPic, setReviewFormPic] = useState('');
    const [reviewFormUID, setReviewFormUID] = useState('');

    const [selected, setSelected] = useState(null);

    const handleSelect = (value) => {
        setSelected(value);
    };

    const ratingCompleted = (rating) => {

        setRating(rating);
    }

    const confirmRental = async (id) => {


        const update = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieAcceptStatus?id=${id}`);

        console.log(update)

        const getHistory = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetRentalHistory?id=${signedInUserDetails.useridentifier}`);
        console.log(getHistory);
        setRentalHistory(getHistory);
    }

  

    const openReviewForm = (name, pic, id) => {

        setReviewFormPic(pic)
        setReviewFromName(name);
        setReviewFormUID(id);
        setShowForm(true);


    }

 

    useEffect(() => {
        setIsLoading(true)
        // setNotifications(dummyNotifications);
        const fetchData = async () => {
            try {

                const getReviews = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUserReviews?id=${signedInUserDetails.useridentifier}`);
                setReviews(getReviews);
                console.log(getReviews);

                const getHistory = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetRentalHistory?id=${signedInUserDetails.useridentifier}`);
                console.log(getHistory);
                setRentalHistory(getHistory);


                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error if needed
                setIsLoading(false);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [signedInUserDetails]);

    const submitReview = async (values) => {

        console.log(values);
    }

    const ReviewSchema = Yup.object().shape({
        authorID: Yup.string(),
        subjectID: Yup.string(),
        reviewTitle: Yup.string()
            .required('Please enter a title.'),
        reviewText: Yup.string()
            .required('Please enter the review.'),
        reviewStatus: Yup.number()
            .required('Please select an option.'),
    });

    const renderHistory = ({ item }) => {

        return (
            <View>
                {item.status === 0 ? (
                    <View>

                        <Card style={styles.card}>
                            <Card.Content style={styles2.cardContent2}>
                                <View style={styles2.profileInfo}>
                                    <Avatar.Image size={50} source={{ uri: item.authorprofile }} />
                                    <View style={styles2.userInfo}>
                                        <Title>{item.authorfirstname} {item.authorsecondname}</Title>
                                        <Paragraph>{convertToDateTimeString(item.requestdate)}</Paragraph>
                                    </View>

                                </View>
                                {/* <View style={styles2.propertyInfo}>
                                    <Text>{address}</Text>
                                    <Avatar.Image size={50} source={{ uri: propertyImage }} />
                                </View> */}
                            </Card.Content>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                                <TouchableOpacity
                                    style={[styles2.confirmButton, selected === 'confirm' && styles2.selected]}
                                    onPress={() => confirmRental(item.rentalhistoryuid)}
                                >
                                    <AntDesign name="check" size={22} color={'white'} />
                                    <Text style={[styles2.selectedText]}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>

                    </View>
                ) : (
                    <View>

                        <Card style={styles.card}>
                            <Card.Content style={styles2.cardContent2}>
                                <View style={styles2.profileInfo}>
                                    <Avatar.Image size={50} source={{ uri: item.authorprofile }} />
                                    <View style={styles2.userInfo}>
                                        <Title>{item.authorfirstname} {item.authorsecondname}</Title>
                                        <Paragraph>{convertToDateTimeString(item.requestdate)}</Paragraph>
                                    </View>
                                </View>
                                {/* <View style={styles2.propertyInfo}>
                                    <Text>{address}</Text>
                                    <Avatar.Image size={50} source={{ uri: propertyImage }} />
                                </View> */}
                            </Card.Content>
                            {!showForm && (
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                                    <Button mode="contained" onPress={() => openReviewForm(item.authorfirstname, item.authorprofile, item.authoridentifier
                                    )} style={styles2.button}>
                                        Write a Review
                                    </Button>
                                </View>
                            )}
                        </Card>

                    </View >
                )}
            </View >
        );
    };

    const renderReviews = ({ item }) => {

        return (
            <View>

                <View>

                    <Card style={styles.card}>
                        <Card.Content >
                            <View style={styles2.profileInfo}>
                                <Avatar.Image size={50} source={{ uri: item.authorprofile }} />
                                <View style={styles2.userInfo}>
                                    <Title>{item.authorfirstname} {item.authorsecondname}</Title>
                                    <Paragraph>{convertToDateTimeString(item.reviewdate)}</Paragraph>
                                </View>

                                <View style={{ marginLeft: 20 }}>
                                    {item.reviewstatus === 1 ? (
                                        <View
                                            style={[styles2.thumbButtonGreen, styles2.selected]}

                                        >
                                            <AntDesign name="like2" size={22} color={'white'} />


                                            <Text style={[styles2.textGreen, styles2.text]}>Positive</Text>
                                        </View>
                                    ) : (
                                        <View
                                            style={[styles2.thumbButtonRed, styles2.selectedRed]}

                                        >
                                            <AntDesign name="dislike2" size={22} color={'white'} />
                                            <Text style={[styles2.textRed, styles2.text]}>Negative</Text>
                                        </View>
                                    )}

                                </View>

                            </View>
                            <View >
                                <Title style={{ marginVertical: 10 }}>{item.reviewtitle}</Title>
                                <Paragraph>{item.reviewtext}</Paragraph>
                            </View>

                        </Card.Content>

                    </Card>

                </View>

            </View>
        );
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
                                        <View>
                                            <FlatList
                                                data={rentalHistory.filter(item => item.status === 0)}
                                                renderItem={renderHistory}
                                                keyExtractor={(r) => r.rentalhistoryid.toString()}
                                            />
                                        </View>
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
                                {!showForm && (
                                    <View>
                                        {rentalHistory && rentalHistory.filter(item => item.status === 1).length > 0 ? (
                                            <View>

                                                <View>
                                                    <FlatList
                                                        data={rentalHistory.filter(item => item.status === 1)}
                                                        renderItem={renderHistory}
                                                        keyExtractor={(r) => r.rentalhistoryid.toString()}
                                                    />

                                                </View>
                                            </View>
                                        ) : (


                                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
                                                <Title>No rental requests pending</Title>
                                            </View>
                                        )}
                                    </View>
                                )}


                                {showForm && ( // Conditionally render the form

                                    <Formik
                                        initialValues={{
                                            authorID: '',
                                            subjectID: '',
                                            reviewTitle: '',
                                            reviewText: '',
                                            reviewStatus: null

                                        }}
                                        validationSchema={ReviewSchema}
                                        onSubmit={values => submitReview(values)
                                        }
                                    >
                                        {({ values, errors, touched, handleChange, setFieldTouched, setFieldValue, isValid, handleSubmit }) => (
                                            <View style={[styles2.container]}>

                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', height: 50 }}>
                                                    <IconButton
                                                        icon="close-box"
                                                        iconColor="red"
                                                        size={40}
                                                        onPress={() => setShowForm(false)}
                                                    />
                                                </View>

                                                <View >
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                        <Avatar.Image size={50} style={{ marginRight: 15 }} source={{ uri: reviewFormPic }} />
                                                        <Title style={{ textAlign: 'center' }}>Leave a Review For {reviewFormName}</Title>
                                                    </View>

                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 }}>

                                                        <View style={styles2.thumbContainer}>
                                                            <TouchableOpacity
                                                                style={[styles2.thumbButtonGreen, selected === 'up' && styles2.selected]}
                                                                onPress={() => {
                                                                    setFieldValue('reviewStatus', 1);
                                                                    handleSelect('up');
                                                                }}
                                                                value={values.reviewStatus}
                                                            >
                                                                <AntDesign name="like2" size={22} color={selected === 'up' ? 'white' : 'black'} />


                                                                <Text style={[styles2.textGreen, selected === 'up' && styles2.text]}>Positive</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={[styles2.thumbButtonRed, selected === 'down' && styles2.selectedRed]}
                                                                onPress={() => {
                                                                    setFieldValue('reviewStatus', 1);
                                                                    handleSelect('down');
                                                                }}
                                                                value={values.reviewStatus}
                                                            >
                                                                <AntDesign name="dislike2" size={22} color={selected === 'down' ? 'white' : 'black'} />
                                                                <Text style={[styles2.textRed, selected === 'down' && styles2.text]}>Negative</Text>
                                                            </TouchableOpacity>


                                                        </View>
                                                      


                                                    </View>
                                                    {errors.reviewStatus && (
                                                            <Text style={[styles2.errorTxt]}>{errors.reviewStatus}</Text>
                                                        )}
                                                    <TextInput
                                                        label="Title"
                                                        mode="outlined"
                                                        style={styles2.input}
                                                        placeholder='Enter Review Title'
                                                        value={values.reviewTitle}
                                                        onChangeText={handleChange('reviewTitle')} 
                                                        onBlur={() => setFieldTouched('reviewTitle')}
                                                    />
                                                    {touched.reviewTitle && errors.reviewTitle && (
                                                        <Text style={styles2.errorTxt}>{errors.reviewTitle}</Text>
                                                    )}
                                                    <TextInput
                                                        label="Description"
                                                        value={values.reviewText}
                                                        onChangeText={handleChange('reviewText')} 
                                                        mode="outlined"
                                                        multiline
                                                        numberOfLines={4}
                                                        style={styles2.input}
                                                        placeholder='Enter Review Details'
                                                    />
                                                    {touched.reviewText && errors.reviewText && (
                                                        <Text style={styles2.errorTxt}>{errors.reviewText}</Text>
                                                    )}
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                                                        <Button
                                                            style={[styles2.confirmButton, styles2.selected]}
                                                            // onPress={() => submitReview()}
                                                            disabled={!isValid}
                                                            onPress={handleSubmit}
                                                        >
                                                            <AntDesign name="check" size={22} color={'white'} />
                                                            <Text style={[styles2.selectedText]}>Confirm</Text>
                                                        </Button>
                                                    </View>
                                                </View>

                                            </View>
                                        )}
                                    </Formik>
                                )}


                            </Card.Content>
                        </Card>
                    </View>


                );
            default:
                return null;
        }
    };

    const renderParentTabContent = () => {
        switch (selectedParentTab) {

            case 'Tab1':
                return (
                    <View style={styles.tabContent}>

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
                );
            case 'Tab2':
                return (
                    <Card style={styles.card}>
                        <Card.Content >

                            <View style={styles.tabContent}>

                                <View>
                                    <FlatList
                                        data={reviews}
                                        renderItem={renderReviews}
                                        keyExtractor={(r) => r.reviewid.toString()}
                                    />
                                </View>


                            </View>

                        </Card.Content>
                    </Card>

                );
            default:
                return null;
        }
    };


    return (
        <ScrollView>
            <View >
                {isLoading ? (
                    <View style={styles2.loadingContainer}>
                        <ActivityIndicator size="large" color="#6200EE" />
                    </View>
                ) : (
                    <>
                        <Card elevation={5} style={styles.card}>
                            <Card.Content>

                                <View style={styles.header}>

                                    <IconButton
                                        icon="arrow-left"
                                        mode="text"
                                        size={30}
                                        style={{ flex: 1, alignItems: 'flex-end' }}
                                        onPress={() => navigation.goBack()}>
                                    </IconButton>


                                </View>

                                <View style={styles.tabButtons}>
                                    <TouchableOpacity
                                        style={[
                                            styles.tabButton,
                                            selectedParentTab === 'Tab1' && styles.selectedTab,
                                        ]}
                                        onPress={() => setSelectedParentTab('Tab1')}
                                    >
                                        <Text>Rental History</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.tabButton,
                                            selectedParentTab === 'Tab2' && styles.selectedTab,
                                        ]}
                                        onPress={() => setSelectedParentTab('Tab2')}
                                    >
                                        <Text>Reviews</Text>

                                    </TouchableOpacity>

                                </View>

                            </Card.Content>


                        </Card>

                        {renderParentTabContent()}
                    </>
                )}
            </View>

        </ScrollView>
    )
}

const styles2 = StyleSheet.create({
    errorTxt: {
        fontSize: 12,
        color: '#FF0D10',
        marginBottom: 8
    },
    card2: {
        marginVertical: 10,
        marginHorizontal: 20,
        elevation: 5,
    },
    cardContent2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfo: {
        marginLeft: 10,
    },
    propertyInfo: {
        alignItems: 'flex-end',
    },

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

    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 0,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginVertical: 10,
    },


    selectedText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RentalHistory