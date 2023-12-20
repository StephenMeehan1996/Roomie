const { Pool } = require('pg'); // Use 'pg' library for PostgreSQL
var format = require('pg-format');
//const AWS = require('aws-sdk');

const rdsConfig = {
    host: '***********************',
    user: '*****',
    password: '******',
    database: '*****',
    port: '***', 
    headers:{ '***********' : '*' },
  };

exports.handler = async (event) => {
  const pool = new Pool(rdsConfig);

  const requestBody = event;
     

  //  console.log(values);
  const query = format('INSERT INTO public."AddImageTBL" ("AddID", "ImageURL", "Filename", "IsFirstImage") VALUES %L', requestBody);

  try {
     const result = await pool.query(query);
    
    return {
      statusCode: 200,
      headers:{ 'Access-Control-Allow-Origin' : '*' },
        body: JSON.stringify(requestBody),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
       headers:{ 'Access-Control-Allow-Origin' : '*' },
      body: JSON.stringify({ message: 'Error: ' + error }),
    };
  } finally {
    pool.end(); // Close the database connection
  }
};