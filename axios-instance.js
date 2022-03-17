import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://minutoeuf-admin.herokuapp.com/api/',
});
export default instance;
