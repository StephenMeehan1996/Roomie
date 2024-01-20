import axios from 'axios'

const useFetchData = async (url) => {
  try {
    // Make a GET request to the specified URL
    const response = await axios.get(url);

    // Access the data from the response
    const data = response.data;

   return data;
   
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error.message);
  }
};
  
export default useFetchData;
