import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3010',
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
    }
})

export default api;