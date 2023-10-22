//import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions,TextInput } from 'react-native';
import { Modal, Portal, Button, Title, Paragraph, Card,IconButton, MD3Colors, Chip, Avatar, Subheading  } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';



const AddDetail = ({navigation}) =>{
  const route = useRoute();
  const {selectedAdImages} = route?.params || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('Tab1');

  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');

  const dropdownOptions = [
                            {label:'Intro Message 1', value:'Hello! Im a passionate and dedicated student eager to embark on a journey of knowledge and discovery. My academic pursuits revolve around computer science and technology, with a keen interest in AI and software development.'},
                            {label:'Intro Message 2', value:'placeholder'},
                            {label:'Intro Message 3', value:'placeholder'},
                          ];

  const handleDropdownSelect = (value) => {
    setSelectedOption(value);
    setMessage(value);
  };

  const handleSendMessage = () => {
    // Handle sending the message here
    // You can use the 'selectedOption' and 'message' state values
  };
 
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Tab1':
        return (
          <View style={styles.tabContent}>
             <Card elevation={5} style={styles.card}>
               <Card.Content>
                <View>
                  <Card style={styles.card2}>
                    <Card.Content style={{padding: 6}}>
                      <Title>Beautiful Property</Title>
                      <Paragraph>Property Details:</Paragraph>
                      <View style={styles.chipContainer}>
                        <Chip style={styles.chip}>Apartment</Chip>
                        <Chip style={styles.chip}>Deposit: 1 Month</Chip>
                        <Chip style={styles.chip}>Smoking Permitted</Chip>
                        <Chip style={styles.chip}>References Required</Chip>
                      </View>
                      <Paragraph>Current occupants:</Paragraph>
                      <View style={styles.chipContainer}>
                        <Chip style={styles.chip}>3</Chip>
                        <Chip style={styles.chip}>Students</Chip>
                        <Chip style={styles.chip}>1st Year</Chip>
                      </View>
                      <View style={styles.sameLineContainer}>
                        <View style={styles.lineInput}>
                          <Paragraph>Environment:</Paragraph>
                          <View style={styles.chipContainer}>
                            <Chip style={styles.chip}>Social</Chip>
                          </View>
                       </View>
                        <View style={styles.lineInput}>
                        <Paragraph>Roomie Expectation:</Paragraph>
                          <View style={styles.chipContainer}>
                            <Chip style={styles.chip}>Socialize together</Chip>
                          </View>
                        </View>
                      </View>
                    </Card.Content>
                    <Card.Content>
                      <Paragraph>
                        This stunning property offers a perfect blend of comfort and style. It features two spacious bedrooms, two modern bathrooms, and a beautiful living area with ample natural light. Located in a serene neighborhood, this house is an ideal choice for your family.
                      </Paragraph>
                    </Card.Content>
                 </Card>
                </View>
              </Card.Content>
            </Card>
          </View>
        );
      case 'Tab2':
        return (
          <View style={styles.tabContent}>
          <Card elevation={5} style={styles.card}>
            <Card.Content>
                  <Card style={[styles.card, {padding: 0}]}>
                    <Card.Cover source={require('../assets/Icons/images/cover.jpg')} style={{borderRadius: 0}}/>
                    <Card.Content>
                      <View style={styles.avatarContainer}>
                        <Avatar.Image size={80} source={require('../assets/Icons/images/kemal.jpg')} />
                      </View>
                      <Title>Joe Bloggs</Title>
                      <Paragraph>Current occupants:</Paragraph>
                      <View style={styles.chipContainer}>
                        <Chip style={styles.chip}>Student</Chip>
                        <Chip style={styles.chip}>1st Year</Chip>
                      </View>
                      <Paragraph>
                         Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.
                      </Paragraph>
                    </Card.Content>
                  </Card>
          </Card.Content>
         </Card>
       </View>
        );
      case 'Tab3':
        return (
          <View style={styles.tabContent}>
          <Card elevation={5} style={styles.card}>
            <Card.Content>
             <View>  
              <Card style={styles.card}>
                <Card.Content>
                 <Paragraph>Select from saved messages:</Paragraph>
                 <Picker
                  style={styles.input}
                  selectedValue={selectedOption}
                  onValueChange={(itemValue, itemIndex) => handleDropdownSelect(itemValue)}
                 >
                  {dropdownOptions.map((option, index) => (
                    <Picker.Item label={option.label} value={option.value} key={index} />
                  ))}
                </Picker>
                   <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={5}   
                    placeholder="Type your bio here..."
                    label="Message"
                    value={message}
                  />
                  <Button mode="contained" onPress={handleSendMessage} style={styles.button}>
                    Apply To Ad
                  </Button>
                </Card.Content>
              </Card>
            </View>
           </Card.Content>
         </Card>
       </View>
        );
      default:
        return null;
    }
  };

  const navigateImage = (step) => {
    // Calculate the next image index
    let newIndex = selectedImageIndex + step;
    
    // Ensure the index stays within bounds
    if (newIndex < 0) {
      newIndex = selectedAdImages.length - 1;
    } else if (newIndex >= selectedAdImages.length) {
      newIndex = 0;
    }
    
    setSelectedImageIndex(newIndex);
  };

  return (
  <ScrollView>
    <View >
    <Card elevation={5} style={styles.card}>
              <Card.Content>
                <View style={styles.header}>
                  <IconButton
                      icon="arrow-left"
                      mode="text"
                      size={30}
                      style={{flex:1,alignItems: 'flex-end'}}
                      onPress={() => navigation.goBack()}>
                  </IconButton>
                </View>
              </Card.Content>
            </Card>
    <Card elevation={5} style={styles.card}>
      <Card.Content style={{paddingTop: 0}}>
        <View style={styles.imageViewer}>
            <Image source={{ uri: selectedAdImages[selectedImageIndex].uri }} style={[styles.fullScreenImage, {  height: 245}]} />
            <View style={styles.buttonContainer}>
                <IconButton
                        icon="chevron-left"
                        mode="text"
                        size={60}
                        iconColor='white'
                        style={{marginLeft: -40}}
                        onPress={() => navigateImage(-1)}>
                </IconButton>
                
                <IconButton
                        icon="chevron-right"
                        mode="text"
                        iconColor='white'
                        style={{marginRight: -40}}
                        size={60}
                        onPress={() => navigateImage(1)}>
                </IconButton>
            </View>
        </View>
        <View style={styles.counter}>
          <Text>{selectedImageIndex + 1}/{selectedAdImages.length}</Text>
        </View>
        <View>
          <Title>Beautiful Property</Title>
          <Paragraph>2 Bedrooms | 2 Bathrooms | 1500 sqft</Paragraph>
          <Paragraph>£1500</Paragraph>
          <Paragraph style={styles.addressText}>Church Hill Road</Paragraph>
          <Paragraph style={styles.addressText}>Sligo Town</Paragraph>
          <Paragraph style={styles.addressText}>County Sligo</Paragraph>
          </View>
      </Card.Content>
      </Card>

      <View >
      <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Tab1' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('Tab1')}
        >
                <Text>Description</Text>
              
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Tab2' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('Tab2')}
        >
          <Text>Add Poster</Text>
        
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'Tab3' && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab('Tab3')}
        >
          <Text>Contact</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </View>

    </View>
  </ScrollView>

  );
}
const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF'
  },
  sameLineContainer: {
    flexDirection: 'row', // Display first and last name fields horizontally
    justifyContent: 'flex-start' // Add space between the two fields
  },
  lineInput:{
    marginRight: 15
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    position: 'absolute',
   
  },
  counter:{
   alignSelf: 'flex-end'
  },
  card2: {
    margin: 0,
    backgroundColor: '#FFF'
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  iconButton: {
    alignSelf: 'flex-end',
    textAlign: 'right' // Right-align the icon within the container
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: '#fff',
    borderRadius: 0
  },

  card: {
    width: '100%',
    backgroundColor: '#FFF',
    marginBottom: 10,
    padding: 5,
    paddingTop: 0,
    borderRadius: 0
  },

  fullScreenImage: {
  
    width: Dimensions.get('window').width + 20
  },

  imageViewer: {
 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  tabButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 50,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  selectedTab: {
    borderColor: 'blue',
  },
  tabContent: {


  },
  
});

export default AddDetail;