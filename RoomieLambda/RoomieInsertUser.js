const { Client } = require('pg'); // Use 'pg' library for PostgreSQL
var format = require('pg-format');
//const AWS = require('aws-sdk');


exports.handler = async (event) => {
  
    const client = {
        host: '***********************',
        user: '*****',
        password: '******',
        database: '*****',
        port: '***', 
        headers:{ '***********' : '*' },
      };
  
  try {
    const formData = JSON.parse(JSON.stringify(event)); // Assuming form data is sent in the request body
    await client.connect();
    let  result = await client.query(
      'SELECT RoomieInsertUser($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27,$28, $29, $30, $31, $32, $33, $34, $35)',
      [
         formData.email,
         formData.firstName,
         formData.lastName,
         '11/09/19',
         formData.gender,
         formData.selectedRentalPref,
         formData.shareData,
         formData.shareName,
         formData.smoke,
         formData.userIdentifier,
         formData.addressLine1,
         formData.addressLine2,
         formData.county,
         formData.city,
         formData.zip,
         formData.bio,
         formData.intoVideoURL,
         formData.occupation,
         formData.occupationDropdownValue,
         formData.houseSharePriceRangeMax,
         formData.houseSharePriceRangeMin,
         formData.houseShareRoomType,
         formData.houseShareHouseType,
         formData.environment,
         formData.houseMateExpect,
         formData.houseRentalPriceRangeMax,
         formData.houseRentalPriceRangeMin,
         formData.numRooms,
         formData.houseRentalHouseType,
         formData.digsPriceRangeMax,
         formData.digsPriceRangeMin,
         formData.digsRoomType,
         formData.digsDays,
         formData.digsMealIncluded,
         formData.digsHouseType
      ]
    );
        
    await client.end();
     
    return {
      statusCode: 200,
      body: JSON.stringify({ formData }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error inserting form data', error: error.message }),
    };
  }
};