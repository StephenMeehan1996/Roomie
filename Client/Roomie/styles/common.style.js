import { StyleSheet,Dimensions} from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      black: {
        //color: '#1c1b1fde' 
        color: 'red' 
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
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
        marginBottom: 10
      },
      infoText: {
        fontSize: 16,
        marginBottom: 5
      },
      greenText: {
          color: 'green', // Set the color to green
          fontWeight: 'bold', // Optional: You can apply additional styles as needed
        },
      sameLineContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start' 
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
      buttonContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Adjust as needed
        padding: 10,
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
      searchBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
        paddingHorizontal: 5
      },
      Whitebutton: {
        backgroundColor: '#FFFFFF', 
        padding: 10,
        borderRadius: 10,
        minWidth: 80,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6200EE'
      },
      button: {
        backgroundColor: '#FFFFFF', 
        padding: 10,
        borderRadius: 10,
        minWidth: 80,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6200EE'
      },
      selectedButton: {
        backgroundColor: '#6750a4'
      },
      buttonText: {
        color: 'black',
        fontWeight: 'bold',
      },
      selectedButtonText: {
        color: 'white',
        fontWeight: 'bold',
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
      infoText: {
        fontSize: 16,
    
        marginBottom: 5
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      greenText: {
          color: 'green', // Set the color to green
          fontWeight: 'bold', // Optional: You can apply additional styles as needed
        },
      sameLineContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-start' 
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
        backgroundColor: '#ebdefa'
       
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

      chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25
      },
      chatDetails: {
        flex: 1,
        marginLeft: 10,
      },
      username: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      lastMessageDate: {
        color: '#666',
      },
      applicationContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },
      applicationBorder:{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 15
      }
 
  });

  export default styles;