import axios from 'axios';


const GsServerAPI = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true, // ensure cookies are included
});

export default GsServerAPI;