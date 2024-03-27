import { AccountData, AccountResponse } from '../types/types';
import api from './api';

const accountService = {
  createAccount: async (accountData: AccountData): Promise<AccountResponse> => {
    const response = await api.post('accounts', accountData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  updateAccount: async (accountId: number, accountData: AccountData): Promise<AccountResponse> => {
    const response = await api.put(`accounts/${accountId}`, accountData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  deleteAccount: async (accountId: number): Promise<void> => {
    await api.delete(`accounts/${accountId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  listAccountsByUser: async (userId: number): Promise<AccountResponse[]> => {
    const response = await api.get(`users/${userId}/accounts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  listTransactionsByAccount: async (accountId: number): Promise<AccountResponse[]> => {
    const response = await api.get(`accounts/${accountId}/transactions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },
};

export default accountService;
