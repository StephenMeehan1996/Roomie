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
      'SELECT roomieupdateuserdetails($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
      [
         formData.uid, 
         formData.shareName,
         formData.shareData,
         formData.smoke,
         formData.addressLine1,
         formData.addressLine2,
         formData.city,
         formData.county,
         formData.zip,
         formData.bio,
         formData.occupation,
         formData.occupationDropdownValue,
         
      ]
    );
        
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