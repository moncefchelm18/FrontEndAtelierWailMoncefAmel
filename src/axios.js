import axios from 'axios';

const baseURL = 'http://172.20.10.4:8000';

const instance = axios.create({
    baseURL: baseURL,
});

export default instance;
