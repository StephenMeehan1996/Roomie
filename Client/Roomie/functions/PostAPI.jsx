import axios from 'axios';

const callLambdaFunction = async (valueToInsert, url) => {
  try {
    console.log('here')
    //const apiUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/post'; // working endpoint
    //const apiUrl = 'https://2j5x7drypl.execute-api.eu-west-1.amazonaws.com/dev/add';
    const response = await axios.post(url,  valueToInsert);

   // console.log('Response:', response.data); // Logging the response data, you can handle it as needed
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};



export default callLambdaFunction;