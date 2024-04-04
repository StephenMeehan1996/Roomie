import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button, IconButton, Chip } from 'react-native-paper';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Collapsible from 'react-native-collapsible';
import CarouselCards from './CarouselCards'
import AddDetail from './AddDetail'
import Ad from './Ad';
import formStyles from '../styles/formStyle.style';
import { calculateReviewStats, returnSelectedProfileImage, returnSelectedCoverImage, handleChat } from '../functions/CommonFunctions';
import useFetchData from '../functions/GetAPI';
import useFetchDataBoth from '../functions/DetailAndImageGetAPI';
import { useAppContext } from '../Providers/AppContext';
import styles from '../styles/common.style';



const ViewUserProfile = ({ navigation, route }) => {
    const { signedInUserDetails, setSignedInUserDetails } = useAppContext();
    const video = React.useRef(null);
    const [status, setStatus] = useState({});
    const [uID, setUID] = useState(route.params.uID);
    const [selectedTab, setSelectedTab] = useState('Tab1');
    const [userImages, setUserImages] = useState([]);
    const [userAdImages, setUserAdImages] = useState([]);
    const [userAdDetail, setUserAdDetail] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [isBioExpanded, setIsBioExpanded] = useState(false);
    const { profileImage, setProfileImage } = useState([]);
    const [coverImage, setCoverImage] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [selectedApplicationTab, setSelectedApplicationTab] = useState('Tab1');
    const fetchAds = useFetchDataBoth();


    useEffect(() => {

        // setNotifications(dummyNotifications);
        const fetchData = async () => {
            try {
                setUpdating(true);
                const getUserImages = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetProfileImages?uid=${uID}`);
                setUserImages(getUserImages);


                const getUserDetails = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetUser?uid=${uID}`);
                setUserDetails(getUserDetails[0]);


                console.log(getUserDetails)


                setUpdating(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error if needed
                setUpdating(false);
            }
        };

        // Call the fetchData function
        fetchData();
    }, [uID]);

    useEffect(() => {

        const setSelectedImages = async () => {
            try {
                setProfileImage(returnSelectedProfileImage(userImages));
                setCoverImage(returnSelectedCoverImage(userImages));
                console.log(returnSelectedCoverImage(userImages))
            } catch (error) {
                console.log(error);
            }
        };

        // Call the fetchData function
        setSelectedImages();
    }, [uID, userImages]);


const message = async () =>{
    const chats = await useFetchData(`https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieChat?uid=${signedInUserDetails.useridentifier}`); 

    handleChat(chats, navigation, signedInUserDetails.useridentifier, uID)

}

    const renderApplicationTabContent = () => {

        switch (selectedApplicationTab) {

            case 'Tab1':
                return (
                    <View >
                        <Paragraph style={styles2.bio}>{userDetails.bio}</Paragraph>
                    </View>

                );
            case 'Tab2':
                return (
                    <View >
                        <Video
                            ref={video}
                            style={styles2.video}
                            source={{ //
                                // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                                uri: 'https://firebasestorage.googleapis.com/v0/b/roomie-a0158.appspot.com/o/video%2FWIN_20240403_10_34_28_Pro.mp4?alt=media&token=29242532-6241-442a-bc6c-2783c4f2f5ea',
                            }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                        />
                        <View style={styles2.buttons}>
                            <Button
                                title={status.isPlaying ? 'Pause' : 'Play'}
                                onPress={() =>
                                    status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                                }
                            />
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Tab1':
                return (
                    <View style={styles2.tabContent}>

                        <Title>{userDetails.firstname}'s Details</Title>
                        <View style={styles.chipContainer}>
                            <Chip style={styles.chip}>{userDetails.gender}</Chip>

                            <Chip style={styles.chip}>{userDetails.occupationtitle}</Chip>
                            <Chip style={styles.chip}>Year: {userDetails.occupationdetail}</Chip>
                        </View>

                        <View style={[styles.chipContainer, { marginTop: 15 }]}>
                            <Chip style={styles.chip}>Email Verified</Chip>
                            <Chip style={styles.chip}>Mobile Number Verified</Chip>
                        </View>



                        {/* <View style={styles.sameLineContainer}>
                            <View style={styles.lineInput}>
                                <Paragraph>Environment:</Paragraph>
                                <View style={styles.chipContainer}>
                                    <Chip style={styles.chip}>{ad.envoirnment}</Chip>
                                </View>
                            </View>
                            <View style={styles.lineInput}>
                                <Paragraph>Roomie Expectation:</Paragraph>
                                <View style={styles.chipContainer}>
                                    <Chip style={styles.chip}>{ad.houseexpectation}</Chip>
                                </View>
                            </View>
                        </View> */}


                    </View >
                );
            case 'Tab2':
                return (
                    <View style={styles2.tabContent}>


                    </View>
                );
            case 'Tab3':
                return (
                    <View style={styles2.tabContent}>

                        <View >
                            <Paragraph style={styles2.bio}></Paragraph>
                        </View>


                    </View>
                );

            default:
                return null;
        }
    };
    return (

        <ScrollView>
            <View style={styles2.container}>

                <Card elevation={5} style={styles2.card}>
                    {updating ? (
                        <View style={{ marginVertical: 10 }}>
                            <ActivityIndicator size="large" color="#6200EE" />
                        </View>
                    ) : (
                        <>
                            <Card.Cover
                                source={userImages != null ?
                                    { uri: userImages.find(image => image.imagetype === 2 && image.currentselected === 1)?.imageurl || require('../assets/Icons/images/noCover.png') } :
                                    require('../assets/Icons/images/noCover.png')}
                                style={{ borderRadius: 0, marginBottom: 5 }}
                            />
                            <Card.Content>
                                <Avatar.Image
                                    size={80}
                                    source={userImages != null ?
                                        { uri: userImages.find(image => image.imagetype === 1 && image.currentselected === 1)?.imageurl || require('../assets/Icons/images/NoProfile.png') } :
                                        require('../assets/Icons/images/NoProfile.png')}
                                />
                                <Title style={styles2.username}>{userDetails.firstname} {userDetails.secondname}</Title>
                                <Paragraph style={styles2.tagLine}>
                                    Web Developer | Traveller | Foodie
                                </Paragraph>
                                <View style={[styles2.info, { paddingHorizontal: 50 }]}>

                                    <Text style={styles2.infoText}>Rating: {calculateReviewStats(userDetails.numreviews, userDetails.positivereview)}</Text>
                                    <Button
                                        icon="email"
                                        mode="outlined"
                                        onPress={() => message()}
                                        style={{

                                            height: 25, // Adjust the height as needed
                                            paddingLeft: 11,
                                            borderRadius: 8, // Adjust the border radius to make it square
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                    </Button>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>



                                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>

                                        <Button
                                            icon="text-box"
                                            mode="outlined"
                                            onPress={() => setSelectedApplicationTab('Tab1')}
                                            style={[styles2.bioButton, { width: 150, borderRadius: 0, marginRight: 10 },
                                            selectedApplicationTab === 'Tab1' ? styles2.selectedTab : null,]}>
                                            Bio
                                        </Button>
                                        <Button
                                            icon="video-outline"
                                            mode="outlined"
                                            onPress={() => setSelectedApplicationTab('Tab2')}
                                            style={[styles2.bioButton, { width: 150, borderRadius: 0, marginLeft: 10 },
                                            selectedApplicationTab === 'Tab2' ? styles2.selectedTab : null,]}>
                                            Video
                                        </Button>

                                    </View>

                                    <View>
                                        {renderApplicationTabContent()}
                                    </View>

                                </View>

                            </Card.Content>
                        </>
                    )}
                </Card>
                {updating ? (
                    <View></View>
                ) : (
                    <>


                        <Card elevation={5} style={styles2.card}>
                            <Card.Content>

                                <View >

                                    <View style={styles.tabButtons}>
                                        <TouchableOpacity
                                            style={[
                                                styles.tabButton,
                                                selectedTab === 'Tab1' && styles.selectedTab,
                                            ]}
                                            onPress={() => setSelectedTab('Tab1')}
                                        >
                                            <Text>Details</Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.tabButton,
                                                selectedTab === 'Tab2' && styles.selectedTab,
                                            ]}
                                            onPress={() => setSelectedTab('Tab2')}
                                        >
                                            <Text>Reviews</Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                styles.tabButton,
                                                selectedTab === 'Tab3' && styles.selectedTab,
                                            ]}
                                            onPress={() => setSelectedTab('Tab3')}
                                        >
                                            <Text>Accept</Text>

                                        </TouchableOpacity>

                                    </View>

                                    {renderTabContent()}
                                </View>



                            </Card.Content>
                        </Card>
                    </>
                )}

            </View>
        </ScrollView>
    )
}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vidContainer: {

        justifyContent: 'center',

    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#FFF',
        marginBottom: 10
    },
    username: {
        fontSize: 24,

        textAlign: 'center',
    },


    selectedTab: {
        //backgroundColor: '#4a90e2', // A shade of blue for elegance
        borderRadius: 5, // Rounded corners for a polished look
        borderWidth: 1.5, // Add border for distinction
        borderColor: 'black', // Darker shade of blue for border
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3, // Add// Change to your desired selected tab color
    },
    bio: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'left',
        padding: 10
    },
    tagLine: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
    },
    bioScroll: {
        maxHeight: 100, // Adjust as needed
        marginTop: 8,
    },
    bioButton: {
        alignSelf: 'center',
        marginVertical: 8,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    greenText: {
        color: 'green', // Set the color to green
        fontWeight: 'bold', // Optional: You can apply additional styles as needed
    },
    redText: {
        color: 'red', // Set the color to green
        fontWeight: 'bold', // Optional: You can apply additional styles as needed
    },

});

export default ViewUserProfile