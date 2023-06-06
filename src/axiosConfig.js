import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.39:8000', // Replace with the IP address of your laptop
});

export default instance;