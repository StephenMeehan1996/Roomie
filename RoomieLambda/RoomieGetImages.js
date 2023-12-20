const { Pool } = require('pg');
var format = require('pg-format');

const rdsConfig = {
    host: '***********************',
    user: '*****',
    password: '******',
    database: '*****',
    port: '***', 
    headers:{ '***********' : '*' },
  };

exports.handler = async (event) => {
    const addids = event.queryStringParameters.addids.split(',').map(id => parseInt(id, 10));
    const pool = new Pool(rdsConfig);
    const query = `SELECT * FROM RoomieGetAddImages(ARRAY[${addids}])`;
        
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
    pool.end(); 
  }
};