import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Update this line to point to your backend server
});

export default api;
