import axios from 'axios';

const fetchDataFromDatabase = async (url, imageString) => {
  try {
    console.log(`${url}?imageString=${imageString}`)
    const response = await axios.get(`${url}?imageString=${imageString}`);

    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      console.log('Failed to fetch data');
      // Handle failure here
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle errors here
  }
};

export default fetchDataFromDatabase;