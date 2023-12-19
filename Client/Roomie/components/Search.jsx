import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { Searchbar,Avatar, Card, Title, Paragraph, Button,IconButton, Checkbox, RadioButton, Icon} from 'react-native-paper';
import  styles  from '../styles/common.style';
import { irishCounties} from '../data/formData';
import useFetch from '../functions/GetAPI';


//https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add

const Search = ({navigation, route}) => {
        const [searchQuery, setSearchQuery] = useState('');
        const [searchData, setSearchData] = useState(null);
       // let apiUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add/?addType=1&loc=Roscommon';
       let apiUrl = 'https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetHouseShare?addType=1&loc=Roscommon';
    
       const { data } = useFetch('https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetHouseShare?addType=1&loc=Roscommon', {
        query: "React developer",
        num_pages: "1",
      });

        const onChangeSearch = (query) => {
          setSearchQuery(query);
          if(query.length > 2){
            const location = irishCounties.map(item => item.value);
            const filteredSuggestions = location.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
          );
          setAutocompleteData(filteredSuggestions);
          }
       
        };

        const fetchData = async () => {
            try {
              const result = await fetchDataFromApi(apiUrl);
              setData(result);
            } catch (error) {
              // Handle errors here, e.g., show an error message
              console.error('Error in fetching data:', error);
            }
          };

        const search = (query) =>{
            setSearchQuery(query);
            let type ='';
            switch (selectedButton) {
                case 1:
                    type = 'House Share'
                    break;
                case 2:
                    type = 'House Rental'
                    break;
                case 3:
                    type = 'Digs'
                    break;
                default:
                    break;
            }
            const search ={
                "rentalType": type,
                "query": searchQuery
            }

            // data  = useFetch('https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetHouseShare?addType=1&loc=Roscommon')
            // console.log(data);

         
        }

        const [selectedButton, setSelectedButton] = useState(1);
        const [autocompleteData, setAutocompleteData] = useState([]); // Array to store autocomplete suggestions
        const sampleData = ['Apple', 'Banana', 'Cherry', 'Date', 'Grape', 'Lemon', 'Orange', 'Pineapple'];
        const isButtonSelected = (buttonId) => selectedButton === buttonId;
  
        const handleButtonPress = (buttonId) => {
          setSelectedButton(buttonId);
       
        };

        const handleItemPress = (item) => {
           // setSelectedItem(item);
            setSearchQuery(item);
            setAutocompleteData([]); // Hide the suggestions list after selecting an item
          };
      
        return (
          <View >
            <Card style={styles.card}>
                <Card.Content>
                     <View style={styles.header}>
                            <Title style={styles.title}>Add Type:</Title>
                            <IconButton
                                icon="arrow-left"
                                mode="text"
                                size={30}
                                style={{flex:1,alignItems: 'flex-end'}}
                                onPress={() => navigation.goBack()}>
                            </IconButton>
                        </View>
                     <View style={styles.searchBtnContainer}>
                        
                            <TouchableOpacity
                                style={[
                                styles.button,
                                isButtonSelected(1) && styles.selectedButton,
                                ]}
                                onPress={() => handleButtonPress(1)}
                            >
                                <Text style={[styles.buttonText, isButtonSelected(1) && styles.selectedButtonText]}>House share</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                styles.button,
                                isButtonSelected(2) && styles.selectedButton,
                                ]}
                                onPress={() => handleButtonPress(2)}
                            >
                                <Text style={[styles.buttonText, isButtonSelected(2) && styles.selectedButtonText]}>House Rental</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                styles.button,
                                isButtonSelected(3) && styles.selectedButton
                                ]}
                                onPress={() => handleButtonPress(3)}
                            >
                                <Text style={[styles.buttonText, isButtonSelected(3) && styles.selectedButtonText]}>Digs</Text>
                            </TouchableOpacity>
                    </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    clearIcon='close'
                    iconColor="tomato" // Customize the search icon color
                    inputStyle={{ backgroundColor: 'white', padding: 10}} // Customize the input field style
                    style={{
                        margin: 10,
                        elevation: 2, // Add shadow to the search bar
                        borderRadius: 0,
                        borderWidth: 0.5,
                    // Add a 1-pixel border
                        borderColor: 'gray', // Border color
                        backgroundColor: '#FFFFFF'
                    }}
                    theme={{
                        
                        colors: { primary: '#FFFFFF', background: '#FFFFFF' }, // Customize colors
                    }}
                    onIconPress={() => search(searchQuery)}
                    onClearIconPress = {() =>  setAutocompleteData([])}
               
                
                />
                     
                {searchQuery.length >= 2 && autocompleteData.length > 0 && (
                 <FlatList
                    data={autocompleteData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <Text
                          style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgray',
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                    ListHeaderComponent={<View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray' }} />}
                    ListFooterComponent={<View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray' }} />}
                    style={{
                    maxHeight: 150, // Set a maximum height for the suggestions list
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 10,
                    top: 0,
                    left: 0,
                    right: 0,
                    width: 330,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    // Adjust the right position based on your layout
                    backgroundColor: 'white',
                    }}
                    nestedScrollEnabled={true}
                />
                
                )}
                </Card.Content>
            </Card>
      
          </View>
        );
      
}

export default Search