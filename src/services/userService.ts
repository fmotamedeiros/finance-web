import api from './api';
import { AuthResponse, UserData, LoginData } from '../types/types';
import { AxiosError } from 'axios';

const userService = {
  register: async (userData: UserData): Promise<UserData> => {
    try {
      const response = await api.post('users', userData);
      const data: UserData = response.data;
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error("Error while registering the user.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
};

async function loginUser(loginData: LoginData): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('login', loginData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error("Error while logging the user.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

const validateToken = async (token: string) => {
  try {
    // Validate token here
    const isValid = true;
    if (isValid) {
      return true;
    } 
    return false;
  } catch (error) {
    console.error('Error validating token.', error);
    return false;
  }
};

export {userService, loginUser, validateToken};
