import axios from "axios";
import Cookies from "js-cookie";

const REACT_APP_API_URL  = 'http://localhost:5000';

const repository = axios.create({
    baseURL: REACT_APP_API_URL
});

repository.interceptors.request.use(
    (config) => {
      const access_token = Cookies.get('access_token');
      if (access_token) {
        config.headers.set('Authorization', `Bearer ${access_token}`);
      }
      return config;
    },
  );

export default repository;