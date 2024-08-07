import axios from 'axios';
import { env } from '$env/dynamic/public';

export const API = axios.create({
  baseURL: env.PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
