import { 
    returnAdTypeText,
    returnAdTypeNum,
    references,
    digsMeals,
    returnSelectedCoverImage,
    generateUUID,
    generateShortID,
    convertToDateTimeString,
    smoking,
    returnSelectedProfileImage,
    returnNotificationMessage,
    calculateMatchPercentage
} from '../functions/CommonFunctions'
//npx jest returnAdTypeText.test.js

describe('returnAdTypeText', () => {
  it('should return "House Share" for type 1', () => {
    const result = returnAdTypeText(1);
    expect(result).toEqual('House Share');
  });

  it('should return "House Rental" for type 2', () => {
    const result = returnAdTypeText(2);
    expect(result).toEqual('House Rental');
  });

  it('should return "Digs" for type 3', () => {
    const result = returnAdTypeText(3);
    expect(result).toEqual('Digs');
  });

  it('should return undefined for any other type', () => {
    const result = returnAdTypeText(4);
    expect(result).toBeUndefined();
  });
});

describe('returnAdTypeNum', () => {
    it('should return 1 for "House Share"', () => {
      const result = returnAdTypeNum('House Share');
      expect(result).toEqual(1);
    });
  
    it('should return 2 for "House Rental"', () => {
      const result = returnAdTypeNum('House Rental');
      expect(result).toEqual(2);
    });
  
    it('should return 3 for "Digs"', () => {
      const result = returnAdTypeNum('Digs');
      expect(result).toEqual(3);
    });
  
    it('should return undefined for unknown type', () => {
      const result = returnAdTypeNum('Unknown');
      expect(result).toBeUndefined();
    });
  });
  
  describe('references', () => {
    it('should return "References Required" for type 1', () => {
      const result = references(1);
      expect(result).toEqual('References Required');
    });
  
    it('should return "References not Required" for type 2', () => {
      const result = references(2);
      expect(result).toEqual('References not Required');
    });
  
    it('should return undefined for unknown type', () => {
      const result = references(3);
      expect(result).toBeUndefined();
    });
  });
  
  describe('digsMeals', () => {
    it('should return "Meals provided" for type 1', () => {
      const result = digsMeals(1);
      expect(result).toEqual('Meals provided');
    });
  
    it('should return "Self Catering" for type 2', () => {
      const result = digsMeals(2);
      expect(result).toEqual('Self Catering');
    });
  
    it('should return undefined for unknown type', () => {
      const result = digsMeals(3);
      expect(result).toBeUndefined();
    });
  });
  
  describe('smoking', () => {
    it('should return "Smoking Permitted" for type 1', () => {
      const result = smoking(1);
      expect(result).toEqual('Smoking Permitted');
    });
  
    it('should return "No Smoking" for type 2', () => {
      const result = smoking(2);
      expect(result).toEqual('No Smoking');
    });
  
    it('should return undefined for unknown type', () => {
      const result = smoking(3);
      expect(result).toBeUndefined();
    });
  });

  describe('returnSelectedProfileImage', () => {
    it('should return the selected image when found', () => {
      const images = [
        { imagetype: 1, currentselected: 1 },
        { imagetype: 2, currentselected: 0 },
        { imagetype: 3, currentselected: 0 }
      ];
      const result = returnSelectedProfileImage(images);
      expect(result).toEqual({ imagetype: 1, currentselected: 1 });
    });
  
    it('should return null if no selected image found', () => {
      const images = [
        { imagetype: 2, currentselected: 0 },
        { imagetype: 3, currentselected: 0 }
      ];
      const result = returnSelectedProfileImage(images);
      expect(result).toBeNull();
    });
  });

  describe('returnSelectedCoverImage', () => {
    it('should return the selected image when found', () => {
      const images = [
        { imagetype: 1, currentselected: 0 },
        { imagetype: 2, currentselected: 1 },
        { imagetype: 2, currentselected: 0 },
        { imagetype: 3, currentselected: 1 }
      ];
      const result = returnSelectedCoverImage(images);
      expect(result).toEqual({ imagetype: 2, currentselected: 1 });
    });
  
    it('should return null if no selected image found', () => {
      const images = [
        { imagetype: 1, currentselected: 0 },
        { imagetype: 3, currentselected: 0 }
      ];
      const result = returnSelectedCoverImage(images);
      expect(result).toBeNull();
    });
  });
  
  describe('generateUUID', () => {
    it('should generate a UUID with the correct format', () => {
      const result = generateUUID();
      expect(result).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/);
    });
  });
  
  describe('generateShortID', () => {
    it('should generate a short ID with the correct format', () => {
      const result = generateShortID();
      expect(result).toMatch(/[a-f0-9]{6}/);
    });
  });
  
  describe('convertToDateTimeString', () => {
    it('should convert a date value to a string in the correct format', () => {
      const date = new Date(2024, 2, 29, 14, 30, 45); // Example date: March 29, 2024, 14:30:45
      const result = convertToDateTimeString(date);
      expect(result).toEqual('2024-03-29 14:30:45');
    });
  });


  
  describe('returnNotificationMessage', () => {
    it('should return the message for type 1', () => {
      const result = returnNotificationMessage(1, 'John');
      expect(result).toEqual('John has sent you a message');
    });
  
    it('should return the message for type 2', () => {
      const result = returnNotificationMessage(2, 'Alice');
      expect(result).toEqual('Alice has applied for your advertisement');
    });
  
    it('should return undefined for unknown notification type', () => {
      const result = returnNotificationMessage(3, 'Bob');
      expect(result).toBeUndefined();
    });
  });

  describe('calculateMatchPercentage', () => {
    it('should calculate match percentage for house share ad type', () => {
      const userDetail = {
        gender: 'Male',
        agebracket: '18-25',
        occupation: 'Student',
        smoke: 'No',
        housesharepricemax: 500,
        housesharehousetype: 'Apartment'
      };
      const adDetail = [
        { gender: 'Male', agebracket: '18-25', occupation: 'Student', smokingpermitted: 'No', price: '450', propertytype: 'Apartment' }
      ];
      const adType = 1;
      const result = calculateMatchPercentage(userDetail, adDetail, adType);
      expect(result[0].matchPercentage).toEqual(100);
    });
  
//     it('should calculate match percentage for house rental ad type', () => {
//       const userDetail = {
//         gender: 'Female',
//         agebracket: '26-35',
//         occupation: 'Professional',
//         smoke: 'Yes',
//         houserentalpricemax: 800,
//         houserentalhousetype: 'House',
//         houserentalnumbedrooms: '3 Bedrooms'
//       };
//       const adDetail = [
//         { gender: 'Female', agebracket: '26-35', occupation: 'Professional', smokingpermitted: 'Yes', price: '750', propertytype: 'House', houserentalnumbedrooms: '3 Bedrooms' }
//       ];
//       const adType = 2;
//       const result = calculateMatchPercentage(userDetail, adDetail, adType);
//       expect(result[0].matchPercentage).toEqual(100);
//     });
  
//     it('should calculate match percentage for digs ad type', () => {
//       const userDetail = {
//         gender: 'Male',
//         agebracket: '18-25',
//         occupation: 'Student',
//         smoke: 'No',
//         digspricemax: 300,
//         digshousetype: 'Apartment',
//         digsroomtype: 'Single',
//         digsmealsincluded: 'Yes'
//       };
//       const adDetail = [
//         { gender: 'Male', agebracket: '18-25', occupation: 'Student', digsmealsprovided: 'Yes', price: '250', propertytype: 'Apartment', digsroomtype: 'Single' }
//       ];
//       const adType = 3;
//       const result = calculateMatchPercentage(userDetail, adDetail, adType);
//       expect(result[0].matchPercentage).toEqual(75);
//     });
  });