import axios from 'axios';

const httpPublic = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default httpPublic;
