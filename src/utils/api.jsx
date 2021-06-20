import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:30000",
    timeout: 5000
})

api.interceptors.request.use({
    
})

api.interceptors.response.use({
    
})

export default api;