import axios from 'axios';

interface RegisterData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post('/api/register', data);
  return response.data; 
};
