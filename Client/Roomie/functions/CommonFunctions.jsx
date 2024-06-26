import { StyleSheet, Text } from 'react-native';
//import { getStorage, ref as r, child, deleteObject,set, onValue, get,update } from 'firebase/storage';
import { getDatabase, ref, set, child, get, onValue, update } from "firebase/database";
import { getStorage, ref as r, deleteObject } from 'firebase/storage';
import callLambdaFunction from '../functions/PostAPI';
import { FIREBASE_DATABASE } from '../FirebaseConfig';


export const returnAdTypeText = (type) => {
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

export const returnAdTypeNum = (type) => {
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

export const references = (type) => {
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

export const digsMeals = (type) => {
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

export const smoking = (type) => {
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

  if (numReviews > 0) {

    const positivePercentage = (positiveReviews / numReviews) * 100;

    if (positivePercentage > 60) {

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

export const matchColor = (percent) => {

  if (percent > 60) {

    return (
      <Text style={{ textAlign: 'right', marginLeft: 30, fontSize: 16 }}><Text style={{ textDecorationLine: 'underline' }}>Match:</Text> <Text style={styles.greenText}>{percent}%</Text></Text>
    )
  }

  if (percent > 50 && percent < 60) {

    return (
      <Text style={{ textAlign: 'right', marginLeft: 30, fontSize: 16 }}><Text style={{ textDecorationLine: 'underline' }}>Match:</Text> <Text style={styles.orangeText}>{percent}%</Text></Text>
    )
  }

  return (
    <Text style={{ textAlign: 'right', marginLeft: 30, fontSize: 16 }}><Text style={{ textDecorationLine: 'underline' }}>Match:</Text> <Text style={styles.redText}>{percent}%</Text></Text>
  )
}

export const returnSelectedProfileImage = (images) => {

  const selectedImage = images.find(image => image.imagetype === 1 && image.currentselected === 1);

  if (selectedImage)
    return selectedImage
  return null;

};

export const returnSelectedCoverImage = (images) => {

  const selectedImage = images.find(image => image.imagetype === 2 && image.currentselected === 1);
  if (selectedImage)
    return selectedImage
  return null;

};

export const generateUUID = () => {

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

}

export const generateShortID = () => {
  return 'xxxxxx'.replace(/x/g, function () {
    const r = Math.random() * 16 | 0;
    const v = r < 10 ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const convertToDateTimeString = (val) => {

  const date = new Date(val);


  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export const convertToShortDateString = (val) => {

  const date = new Date(val);


  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();


  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}

export const getStorageLocation = (directory, filename) => {

  const storage = getStorage();

  const x = directory + '/' + filename;

  const fileLocation = r(storage, x);

  return fileLocation.toString();
}

export const deleteImage = async (imagePath) => {

  const storage = getStorage();

  try {
    // Create a reference to the file in Firebase Storage
    const fileRef = r(storage, imagePath);

    // Delete the file
    await deleteObject(fileRef);

    console.log(`Image ${imagePath} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting image:', error.message);
  }
}

// export const openChat = async (chats, ad, uID) => {
//   let c;
//   //chats, ad, UUID
//   if (!chats || chats.length === 0) {
//     c = generateUUID();
//     const chatRecord = {
//       chatID: c,
//       user1: uID,
//       user2: ad.useridentifier
//     };

//     let res = await callLambdaFunction(chatRecord, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/chat'); // working 
//     setForceRefresh(prev => !prev); // triggers refresh after post
//   }

//   else if (chats.length > 0) {

//     const matchingChatRecord = chats.find(record => record.user1 === ad.useridentifier || record.user2 === ad.useridentifier);

//     if (matchingChatRecord) {

//       c = matchingChatRecord.chatid
//       console.log(c);

//     }
//     else {
//       c = generateUUID();
//       const chatRecord = {
//         chatID: c,
//         user1: uID,
//         user2: ad.useridentifier
//       };

//       let res = await callLambdaFunction(chatRecord, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/chat'); // working 
//       setForceRefresh(prev => !prev); // triggers refresh after post
//     }

//   }
//   let obj = {
//     chatID: c,
//     uID: uID
//   }
//   return obj

// }

const propertyWeights = {
  gender: 0.3,
  age: 0.2,
  rentalPreference: 0.5,

};

export const calculateMatchPercentage = (userDetail, adDetail, adType) => {

  const weights = {
    price: 0.3,
    gender: 0.2,
    agebracket: 0.1,
    occupation: 0.2,
    smoking: 0.2,
    standardWeight: 0.2
  };
  let totalPossible = 0;



  adDetail.forEach(detailObj => {
    let totalWeight = 0;
    let matchedObjects = [];

    console.log('ID' + detailObj.addid)
    console.log('User: ' + userDetail)
    console.log('Ad: ' + detailObj)
    console.log(userDetail);
    console.log(detailObj);

    if (detailObj.gender === userDetail.gender) {
      totalWeight += weights.gender;
      matchedObjects.push({ id: 2, prop: 'Gender', matched: 1 });
    } else
      matchedObjects.push({ id: 2, prop: 'Gender', matched: 0 });

    if (userDetail.agebracket && detailObj.agebracket === userDetail.agebracket) {
      totalWeight += weights.agebracket;
      matchedObjects.push({ id: 3, prop: 'Age', matched: 1 });
    } else
      matchedObjects.push({ id: 3, prop: 'Age', matched: 0 });

    if (userDetail.occupationtitle && detailObj.occupation === userDetail.occupationtitle) {
      totalWeight += weights.occupation;
      matchedObjects.push({ id: 4, prop: 'Occupation', matched: 1 });
    } else
      matchedObjects.push({ id: 4, prop: 'Occupation', matched: 0 });

    if (userDetail.smoke && detailObj.smokingpermitted === userDetail.smoke) {
      totalWeight += weights.smoking;
      matchedObjects.push({ id: 5, prop: 'Smoking Permitted', matched: 1 });
    } else
      matchedObjects.push({ id: 5, prop: 'Smoking Permitted', matched: 0 });

    if (adType === 1) {
      totalPossible = 1.2;
      if (userDetail.housesharepricemax && parseFloat(detailObj.price) <= userDetail.housesharepricemax) {
        totalWeight += weights.price;
        matchedObjects.push({ id: 6, prop: 'Price', matched: 1 });
      } else
        matchedObjects.push({ id: 6, prop: 'Price', matched: 0 });

      if (userDetail.housesharehousetype && detailObj.propertytype === userDetail.housesharehousetype) {
        totalWeight += weights.standardWeight;
        matchedObjects.push({ id: 7, prop: 'Property Type', matched: 1 });
      } else
        matchedObjects.push({ id: 7, prop: 'Property Type', matched: 0 });
    }

    else if (adType === 2) {
      totalPossible = 1.4;
      if (userDetail.houserentalpricemax && parseFloat(detailObj.price) <= userDetail.houserentalpricemax) {
        totalWeight += weights.price;
        matchedObjects.push({ id: 6, prop: 'Price', matched: 1 });
      } else
        matchedObjects.push({ id: 6, prop: 'Price', matched: 0 });

      if (userDetail.houserentalhousetype && detailObj.propertytype === userDetail.houserentalhousetype) {
        totalWeight += weights.standardWeight;
        matchedObjects.push({ id: 7, prop: 'Property Type', matched: 1 });
      } else
        matchedObjects.push({ id: 7, prop: 'Property Type', matched: 0 });

      if (userDetail.houserentalnumrooms && detailObj.houserentalnumbedrooms === userDetail.houserentalnumrooms) {
        totalWeight += weights.standardWeight;
        matchedObjects.push({ id: 8, prop: 'Number of bedrooms', matched: 1 });
      } else
        matchedObjects.push({ id: 8, prop: 'Number of bedrooms', matched: 0 });

    } else {

      totalPossible = 1.6;
      if (userDetail.digspricemax && parseFloat(detailObj.price) <= userDetail.digspricemax) {
        totalWeight += weights.price;
        matchedObjects.push({ id: 6, prop: 'Price', matched: 1 });
      } else
        matchedObjects.push({ id: 6, prop: 'Price', matched: 0 });

      if (userDetail.digshousetype && detailObj.propertytype === userDetail.digshousetype) {
        totalWeight += weights.standardWeight;
        matchedObjects.push({ id: 7, prop: 'Property Type', matched: 1 });
      } else
        matchedObjects.push({ id: 7, prop: 'Property Type', matched: 0 });

      if (userDetail.digsroomtype && detailObj.propertytype === userDetail.digsroomtype) { // need to add to get 
        totalWeight += weights.standardWeight;
        matchedObjects.push({ id: 7, prop: 'Room Type', matched: 1 });
      } else
        matchedObjects.push({ id: 7, prop: 'Room Type', matched: 0 });

      if (userDetail.digsmealsincluded && detailObj.digsmealsprovided === userDetail.digsmealsincluded) {
        totalWeight += weights.standardWeight;
        matchedObjects.push({ id: 8, prop: 'Meals Included', matched: 1 });
      } else
        matchedObjects.push({ id: 8, prop: 'Meals Included', matched: 0 });

    }

    detailObj.matchPercentage = (totalWeight / totalPossible) * 100;
    detailObj.matchPercentage = Math.round(detailObj.matchPercentage);
    detailObj.matchedProperties = matchedObjects;
  });

  adDetail.sort((a, b) => b.matchPercentage - a.matchPercentage);

  adDetail.forEach(detailObj => {
    console.log('Match Percentage:', detailObj.matchPercentage);
  });

  return adDetail;

};

export const sortAds = (ads, prop) =>{

  if(prop == 'Date'){

    ads.sort((a, b) => - new Date(b.postdate) - new Date(a.postdate) );

  }
  
  else if(prop == 'Match %'){
    ads.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }


  return ads
}

export async function updateNotifications(id, uID, obj) {

  const db = FIREBASE_DATABASE;

  obj.forEach(async notification => {

    const notificationRef = ref(db, `notifications/${uID}/${notification.key}`);

    try {
      // Update the 'seen' property to 1
      await update(notificationRef, { seen: 1 });
      console.log(`Notification with key ${notification.key} updated successfully.`);
    } catch (error) {
      console.error(`Error updating notification with key ${notification.key}:`, error);
    }
  });
}


export function writeNotification(recipientID, name, uID, pic, chatID, notificationType) { // passes message from chat UI component

  const db = FIREBASE_DATABASE;

  set(ref(db, `notifications/${recipientID}/` + generateShortID()), {
    date: new Date().toISOString(), // needs to be refactored
    message: returnNotificationMessage(notificationType, name),
    creatorID: uID,
    creatorProfileImageURL: pic,
    seen: 0,
    chatID: chatID,
    notificationType: notificationType
  });

}

export const returnNotificationMessage = (notType, name) => {

  switch (notType) {
    case 1:
      return `${name} has sent you a message`
    case 2:
      return `${name} has applied for your advertisement`
    case 3:
      return `${name} has accepted your ad application`
    case 4:
      return `${name} has left you a review`
    case 5:
      return `${name} has confirmed your rental request`
    case 6:
      return `Success ${name}, your ad has been created `
  }
}

export const handleChat = async (chats, navigation, uID, uID2) => {
  let c;
  let matchingChatRecord;
  console.log(chats);

  const routes = navigation.getState().routes;
  const lastRoute = routes[routes.length - 1];

  console.log(routes);



  if (!chats || chats.length === 0) {
    id = generateUUID();
    const chatRecord = {
      chatID: id,
      user1: uID,
      user2: uID2
    };

    let res = await callLambdaFunction(chatRecord, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/chat'); // working 

    navigation.navigate('_chat', { // replaces navigation, so can open new chat
      chatID: id,
      uID: uID,
      recipientID: uID2
    });
  }

  else if (chats.length > 0) {

    matchingChatRecord = chats.find(record => record.user1 === uID2 || record.user2 === uID2);

    if (matchingChatRecord) {

      c = matchingChatRecord.chatid
      console.log(c);

      navigation.pop(); // removes last chat 


      navigation.navigate('_chat', { // replaces navigation, so can open new chat
        chatID: c,
        uID: uID,
        recipientID: uID2
      });

    }
    else {
      id = generateUUID();
      const chatRecord = {
        chatID: id,
        user1: uID,
        user2: uID2
      };

      let res = await callLambdaFunction(chatRecord, 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/chat'); // working 

      navigation.navigate('_chat', { // replaces navigation, so can open new chat
        chatID: id,
        uID: uID,
        recipientID: uID2
      });

    }

  }
  //https://reactnavigation.org/docs/navigating/

}

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
    color: 'green',
    fontWeight: 'bold',
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
  },
  orangeText: {
    color: 'orange',
    fontWeight: 'bold',
  }

});
