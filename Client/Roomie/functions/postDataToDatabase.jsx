import axios from 'axios';

const postDataToDatabase = async (data, url) => {
  try {
    const response = await axios.post(`${url}`, data);

    if (response.status === 200) {
      console.log(response);
      // Handle success here
    } else {
      console.log('Failed to post data');
      // Handle failure here
    }
  } catch (error) {
    console.error('Error posting data:', error);
    // Handle errors here
  }
};

export default postDataToDatabase;