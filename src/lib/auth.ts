import { LoaderFunctionArgs } from '@tanstack/react-router';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
// const API_URL = 'http://localhost:5173';

// const uri = "mongodb+srv://ahmadkalo93:GFFY4Xz3Vwfxw35@cluster0.zkx3ub0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Configure axios
axios.defaults.withCredentials = true;



export async function checkAuth() {
  try {
    const response = await axios.get(`${API_URL}/auth/check`);
    return response.data.isAuthenticated;
  } catch (error) {
    return false;
  }
}


export function protectedLoader({ context, navigate }: LoaderFunctionArgs) {
  if (!context?.isAuthenticated) {
    throw navigate({
      to: '/login',
      search: {
        redirect: window.location.pathname,
      },
    });
  }
  return null;
}



export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}


export async function register(name: string, email: string, password: string) {
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
}



export async function logout() {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
}



export async function getUserProfile() {
  const response = await axios.get(`${API_URL}/user/profile`);
  return response.data.user;
}



export async function updateUserProfile(data: { name: string }) {
  const response = await axios.put(`${API_URL}/user/profile`, data);
  return response.data;
}