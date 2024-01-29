import axios from 'axios';

function putAPI(apiUrl, requestData) {
  return axios.put(apiUrl, requestData)
    .then(response => {
      console.log('PUT Request Successful:', response.data);
      return response.body; // You can return the response data or perform additional actions
    })
    .catch(error => {
      console.error('PUT Request Error:', error);
      throw error; // You can throw the error or handle it as needed
    });
}

export default putAPI;