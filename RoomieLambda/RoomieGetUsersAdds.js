const { Pool } = require('pg'); // Use 'pg' library for PostgreSQL
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
  const queryString = event.queryStringParameters;
  
  let uid = queryString.uid;
  
  let query = `SELECT * from RoomieGetUsersAdds('${uid}');`;
  
  try {
    // Your SQL query to read data from the RDS table
    const { rows } = await pool.query(query);
    
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
      console.error('Error reading data from RDS:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error reading data from RDS' }),
    };
  } finally {
    pool.end(); // Release the client back to the pool
  }
};