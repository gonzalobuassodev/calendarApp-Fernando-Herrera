import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;


const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});

// TODO: configurar interceptors
calendarApi.interceptors.request.use(config => {

    const token = localStorage.getItem('token');
    config.headers['x-token'] = token;

    return config;
})


export default calendarApi;
