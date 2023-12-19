import axios from 'axios';

const useFetchDataBoth = () => {
  const fetchData = async (detailUrl) => {
    let images = '';
    try {
      const response = await axios.get(detailUrl);
      const detail = response.data; // Assuming response.data is an array of advertisements
      
      if (detail.length === 0) {
        return {
          detail: [], // Return an empty array for detail
          images: []  // Return an empty array for images as no detail is available
        };
      }
      // Extracting AdIDs from the advertisements array
      const adIDs = detail.map(ad => ad.addid);
      const result = adIDs.join(', ');
      console.log(result);

      let  imageUrl = 'https://o4b55eqbhi.execute-api.eu-west-1.amazonaws.com/RoomieGetImages?addids='+result;
      
      
      const apiResponse = await axios.get(imageUrl);

      return {
        detail,
        images: apiResponse.data // Returning data from the subsequent API request
      };
    } catch (error) {
      throw error;
    }
  };

  return fetchData;
};

export default useFetchDataBoth;