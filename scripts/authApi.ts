import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConfig';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (fullName: String, email: String, username: String, password: String) => {
  const response = await api.post('/auth/register', { fullName, email, username, password });
  return response.data;
};
