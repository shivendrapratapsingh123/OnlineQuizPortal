import axios from "axios";

const axiosInstance = axios.create({

  headers:{
    Authorization : `Brearer ${localStorage.getItem("token")}`
  }
});


export default axiosInstance;
