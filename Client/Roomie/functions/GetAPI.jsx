import { useState, useEffect } from "react";
import axios from 'axios'

const useFetch = (url) =>{
    const [data, setData] = useState([]);

  
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(response);
        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
  
    // useEffect(() => {
    //   fetchData();
    // }, []);
  
    return {data};
  
}
export default useFetch;

