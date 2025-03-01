import axios from 'axios';

interface RegisterData {
  email: string;
  password: string;
}
export const registerUser = async (data: RegisterData) => {
  const response = await axios.post('http://localhost:8000/api/user/inscription', data);
  return response.data;
}
export const loginUser = async (data: RegisterData) => {
  const response = await axios.post('http://localhost:8000/api/user/connexion', data);
  return response.data;
}