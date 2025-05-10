import axios, { AxiosResponse } from 'axios';

const headers = {
  'Content-Type': 'application/json'
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers
});

export { axiosClient };
export type { AxiosResponse };

