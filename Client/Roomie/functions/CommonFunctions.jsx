import {  StyleSheet, Text } from 'react-native';
import { getStorage, ref, child, deleteObject } from 'firebase/storage';
import callLambdaFunction from '../functions/PostAPI';

export const returnAdTypeText =  (type) => {
    switch (type) {
        case 1:
            return 'House Share'
            break;
        case 2:
            return 'House Rental'
            break;
        case 3:
            return 'Digs'
            break;
        default:
            return
            break;
    }
};

export const returnAdTypeNum =  (type) => {
    switch (type) {
        case 'House Share':
            return 1
            break;
        case 'House Rental':
            return 2
            break;
        case 'Digs':
            return 3
            break;
        default:
            return
            break;
    }
};

export const references =  (type) => {
    switch (type) {
        case 1:
            return 'References Required'
            break;
        case 2:
            return 'References not Required'
            break;
       
        default:
            return
            break;
    }
};

export const digsMeals =  (type) => {
    switch (type) {
        case 1:
            return 'Meals provided'
            break;
        case 2:
            return 'Self Catering'
            break;
       
        default:
            return
            break;
    }
};

export const smoking =  (type) => {
    switch (type) {
        case 1:
            return 'Smoking Permitted'
            break;
        case 2:
            return 'No Smoking'
            break;
       
        default:
            return
        break;
    }

};

export const calculateReviewStats = (numReviews, positiveReviews) => {

    if(numReviews > 0){

      const positivePercentage = (positiveReviews / numReviews) * 100;

      if(positivePercentage > 60){

        return (
          <Text style={styles.greenText}>{positivePercentage}% Positive ({numReviews})</Text>
        )
      }

      return (
        <Text style={styles.redText}>{positivePercentage}% Positive ({numReviews})</Text>
      )

    }
    return (
      <Text style={styles.redText}>No Reviews</Text>
    )
  

   }

   export const returnSelectedProfileImage =  (images) => {
  
    const selectedImage = images.find(image => image.imagetype === 1 && image.currentselected === 1);

    if(selectedImage)
    return selectedImage
  return null;

};

export const returnSelectedCoverImage =  (images) => {
 
  const selectedImage = images.find(image => image.imagetype === 2 && image.currentselected === 1);
  if(selectedImage)
    return selectedImage
  return null;

};

export const generateUUID = () => {

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

}

export const generateChatID = () => {
  return 'xxxxxx'.replace(/x/g, function() {
    const r = Math.random() * 16 | 0;
    const v = r < 10 ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const convertToDateTimeString = (val) =>{

  const date = new Date(val);


    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const getStorageLocation = (directory, filename) => {
  const storage = getStorage();


  const x = directory+'/'+filename;

  const fileLocation = ref(storage, x);

  return fileLocation.toString();
}




export const deleteImage = async (imagePath) => {

  const storage = getStorage();

  try {
    // Create a reference to the file in Firebase Storage
    const fileRef = ref(storage, imagePath);

    // Delete the file
    await deleteObject(fileRef);

    console.log(`Image ${imagePath} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting image:', error.message);
  }
}

export const openChat = async (chats, ad, uID)  =>{
  let c;
 //chats, ad, UUID
  if (!chats || chats.length === 0) {
    c = generateUUID();
    const chatRecord = {
      chatID: c,
      user1: uID,
      user2: ad.useridentifier
    };

    let res = await callLambdaFunction(chatRecord, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/chat'); // working 
    setForceRefresh(prev => !prev); // triggers refresh after post
  }

  else if(chats.length > 0){

      const matchingChatRecord = chats.find(record => record.user1 === ad.useridentifier || record.user2 === ad.useridentifier);

      if(matchingChatRecord){

        c = matchingChatRecord.chatid
        console.log(c);

      }
      else{
        c = generateUUID();
        const chatRecord = {
          chatID: c,
          user1: uID,
          user2: ad.useridentifier
        };
      
        let res = await callLambdaFunction(chatRecord, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/chat'); // working 
        setForceRefresh(prev => !prev); // triggers refresh after post
    }

  }
     let obj ={
      chatID: c,
      uID : uID
     }
  return obj
     
  }

  const propertyWeights = {
    gender: 0.3,
    age: 0.2,
    rentalPreference: 0.5,

  };
  

  export const calculateMatchPercentage = (advertisementPreferences, userProfilePreferences) => {
    let totalWeight = 0;
    let weightedScore = 0;
  
    
    Object.keys(advertisementPreferences).forEach(property => {
  
      if (userProfilePreferences.hasOwnProperty(property)) {
 
        weightedScore += Math.min(advertisementPreferences[property], userProfilePreferences[property]) * propertyWeights[property];
      
        totalWeight += propertyWeights[property];
      }
    });
  
   
    const percentageMatch = (weightedScore / totalWeight) * 100;
  
    return percentageMatch.toFixed(2); // Round to 2 decimal places
  };





   const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    card: {
      width: '100%',
      backgroundColor: '#FFF',
      marginBottom: 10
    },
    username: {
      fontSize: 24,
      marginTop: 10,
      textAlign: 'center',
    },
    bio: {
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
      }
  });
