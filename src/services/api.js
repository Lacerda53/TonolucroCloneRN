import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tonolucroapi.gear.host/api',
});

export default api;
