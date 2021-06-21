import axios from 'axios';

const api = axios.create({
    baseURL: "http://"+localStorage.getItem('ipServidor') + ":3000",
    timeout: 5000
})

api.interceptors.request.use({
    
})

api.interceptors.response.use({
    
})

export default api;