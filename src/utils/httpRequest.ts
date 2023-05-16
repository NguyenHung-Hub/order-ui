import axios from 'axios';
import config from '../config';
const httpRequest = axios.create({
    baseURL: config.BASE_URL,
});

export default httpRequest;
