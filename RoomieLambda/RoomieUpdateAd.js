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
    let in_type = formData.addType;
    await client.connect();
    let result = '';
    
    //const currentDate = new Date();


    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    // const year = currentDate.getFullYear();
    // const formattedDateString = `${month}/${day}/${year}`;
    
    if(in_type == 1) // House Share
    {
       result = await client.query(
      'SELECT roomieupdatead($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
      [
         in_type,
         formData.id,
         formData.houseSharePrice,
         formData.houseShareHouseType,
         formData.bio,
         formData.referenceRequired,
         formData.deposit,
         formData.houseMateDetailOption,
         formData.numOccupants,
         formData.houseShareRoomType,
         formData.houseShareEnsuite,
         null,
         null,
         null,
         formData.houseMateGender,
         formData.houseMateAge,
         formData.houseMateOccupation,
         formData.houseMateDetailOption,
         formData.houseMateSmoking,
         formData.houseMateExpect,
         formData.environment
      ]
    );
        
    }
     else if(in_type == 2) // House Rental
    {
       result = await client.query(
      'SELECT roomieupdatead($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
      [
         in_type,
         formData.id,
         formData.houseSharePrice,
         formData.houseRentalHouseType,
         formData.bio,
         formData.referenceRequired,
         formData.deposit,
         formData.tenantDetailOption,
         null,
         null,
         null,
         formData.numRooms,
         null,
         null,
         formData.tenantGender,
         formData.tenantAgeBracket,
         formData.tenantOccupation,
         formData.tenantDetailOption,
         formData.tenantSmoking,
         null,
         null
      ]
    );
        
    } 
    else if(in_type == 3) // Digs
    {
       result = await client.query(
      'SELECT roomieupdatead($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
      [
         in_type,
         formData.id,
         formData.digsPrice,
         formData.digsHouseType,
         formData.bio,
         formData.referenceRequired,
         formData.deposit,
         formData.digsDetailOption,
         formData.numOccupants,
        'Double Ensuite',
         null,
         null,
         formData.digsMealIncluded,
         formData.digsDays,
         formData.digsGender,
         formData.digsAge,
         formData.digsOccupation, // may be mixed up
         formData.occupationDropdownValue,
         formData.digsSmoking,
         null,
         null
      ]
    );
        
    } 
    await client.end();
 return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'OPTIONS, POST', // Allow OPTIONS and POST methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
      },
      body: JSON.stringify('Success'),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'OPTIONS, POST', // Allow OPTIONS and POST methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
      },
      body: JSON.stringify({ message: 'Error inserting form data', error: error.message }),
    };
  }
};