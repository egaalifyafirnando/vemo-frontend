//import axios
import axios from 'axios';

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://store-dev.web.id/api',
    // baseURL: 'http://127.0.0.1:8000/api',
});

export default Api;
