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
        
        const currentDate = new Date();
    
    
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
        const year = currentDate.getFullYear();
        const formattedDateString = `${month}/${day}/${year}`;
        
        if(in_type == 1) // House Share
        {
           result = await client.query(
          'SELECT roomieinsertad($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)',
          [
             formData.addType,
             formData.posterID,
             formData.posterUID,
             formattedDateString,
             1300,
             formData.addressLine1,
             formData.addressLine2,
             formData.county,
             formData.city,
             formData.zip,
             formData.houseShareHouseType,
             formData.bio,
             formData.referenceRequired,
             formData.deposit,
             1,
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
          'SELECT roomieinsertad($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)',
          [
             formData.addType,
             formData.posterID,
             formData.posterUID,
             formattedDateString,
             1300,
             formData.addressLine1,
             formData.addressLine2,
             formData.county,
             formData.city,
             formData.zip,
             formData.houseRentalHouseType,
             formData.bio,
             formData.referenceRequired,
             formData.deposit,
             1,
             null,
             null,
             null,
             formData.numRooms,
             null,
             null,
             formData.tenantGender,
             formData.tenantAgeBracket,
             formData.tenantOccupation, // may be mixed up
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
          'SELECT roomieinsertad($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)',
          [
             formData.addType,
             formData.posterID,
             formData.posterUID,
             formattedDateString,
             1300,
             formData.addressLine1,
             formData.addressLine2,
             formData.county,
             formData.city,
             formData.zip,
             formData.digsHouseType,
             formData.bio,
             formData.referenceRequired,
             formData.deposit,
             1,
             formData.numOccupants,
             'Double Ensuite', // need to add this 
             1, // Ensuite need to add
             formData.numRooms,
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
         const v_add_id = result.rows[0].roomieinsertad;
         
    
        return {
          statusCode: 200,
          body: JSON.stringify({ v_add_id }),
        };
      } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error inserting form data', error: error.message }),
        };
      }
    };