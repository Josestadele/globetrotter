import axios from "axios";

const API = axios.create({
    baseURL: 'https://raw.githubusercontent.com/',
  });

  export default API