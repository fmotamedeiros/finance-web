import { TransactionData, TransactionResponse } from "../types/types";
import api from "./api";

const transactionService = {
  createTransaction: async (transactionData: TransactionData): Promise<TransactionResponse> => {
    const response = await api.post('transactions', transactionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  listTransactions: async (accountId: number): Promise<TransactionResponse[]> => {
    const response = await api.get(`accounts/${accountId}/transactions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  updateTransaction: async (transactionId: number, transactionData: TransactionData): Promise<TransactionResponse> => {
    const response = await api.put(`transactions/${transactionId}`, transactionData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  deleteTransaction: async (transactionId: number): Promise<void> => {
    await api.delete(`transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },
};

export default transactionService;
