import axios from "axios";

const REACT_APP_API_URL  = 'http://localhost:5000';

const repository = axios.create({
    baseURL: REACT_APP_API_URL
});

export default repository;