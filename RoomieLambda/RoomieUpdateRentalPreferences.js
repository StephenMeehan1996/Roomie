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
      'SELECT roomieupdaterentalpreferences($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
      [
         formData.uid, 
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
      body: JSON.stringify('Success'),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error inserting form data', error: error.message }),
    };
  }
};