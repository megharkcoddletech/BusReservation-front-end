import axios from "axios"

const GetApiCall = async (url:string) => {
      
     const token = localStorage.getItem('token')
      const response = await axios(url, {
        method: 'GET',
        headers: {
          'Content-type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      return response.data.data;
  };
  

export default GetApiCall


