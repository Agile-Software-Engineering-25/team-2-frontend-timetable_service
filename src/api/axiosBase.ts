// api/axiosBase.ts
import axios from 'axios';
import { BACKEND_BASE_URL } from '@/config';

export const axiosBase = axios.create({
  baseURL: BACKEND_BASE_URL,
});
