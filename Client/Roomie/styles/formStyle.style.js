import { StyleSheet,Dimensions} from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    sameLineContainer: {
      flexDirection: 'row', // Display first and last name fields horizontally
      justifyContent: 'space-between' // Add space between the two fields
    },
    lineInput: {
      flex: 1, // Take up equal space in the row
      marginRight: 8, // Add spacing between first and last name fields
    },
    singleLineInput:{
      width: Dimensions.get('window').width * 0.4,
    },
    singleLineInputLong:{
      flexDirection: 'row',
      alignItems: 'center',
    },
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
    card: {
      width: '100%',
      backgroundColor: '#FFF',
      marginBottom: 10,
      padding: 5
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    datePickerContainer: {
    
    },
    resultText: {
      fontSize: 18,
      marginVertical: 10,
    },
  
    profilePictureContainer: {
      width: 50,
      height: 50,
      borderRadius: 75, // Make it a circle by setting half of the width/height as the border radius
      backgroundColor: '#E0E0E0', // Placeholder background color
      justifyContent: 'center',
      alignItems: 'center'
    },
    profilePicture: {
      width: 50,
      height: 50,
      borderRadius: 75,
    },
    uploadButton: {
      backgroundColor: '#007AFF', // Button background color
      padding: 10,
      borderRadius: 5,
    },
    uploadButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxLabel: {
      marginLeft: 10,
      fontSize: 16,
    },
    explanationText: {
      fontSize: 14,
      marginTop: 5,
    }, 
    radioContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  
    dropdown: {
      backgroundColor: 'white',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
      marginTop: 20,
  },
  icon: {
      marginRight: 5,
      width: 18,
      height: 18,
  },
  item: {
      paddingVertical: 17,
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  textItem: {
      flex: 1,
      fontSize: 16,
  },
  shadow: {
      shadowColor: '#000',
      shadowOffset: {
      width: 0,
      height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: '#fff'
  }
  });

  export default styles;