import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import categoryService from '../services/categoryService';
import accountService from '../services/accountService';
import { useUser } from '../context/UserContext';
import { AccountData, CategoryData, TransactionData } from '../types/types';
import TransactionList from '../components/transaction/TransactionList';
import TransactionForm from '../components/transaction/TransactionForm';
import ErrorMessage from '../components/ErrorMessage';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [accountId, setAccountId] = useState<number | ''>('');
  const [error, setError] = useState('');

  const [transactionToEdit, setTransactionToEdit] = useState<TransactionData | null>(null);

  const { user } = useUser();

  const fetchCategoriesAndAccounts = async () => {
    try {
      if (user && user.id) {
        const categoriesResponse = await categoryService.listCategoriesByUser(user.id);
        const accountsResponse = await accountService.listAccountsByUser(user.id);
        setCategories(categoriesResponse);
        setAccounts(accountsResponse);
      }
    } catch (error) {
      console.error('Error listing categories or accounts.', error);
      setError('Error listing categories or accounts.');
    }
  };

  const fetchTransactions = async (accountId: number) => {
    try {
      if (user && user.id) {
        const transactionsResponse = await transactionService.listTransactions(accountId);
        setTransactions(transactionsResponse);
      }
    } catch (error) {
      console.error('Error listing transactions.', error);
      setError('Error listing transactions.');
    }
  };

  useEffect(() => {
    fetchCategoriesAndAccounts();
  }, []);

  useEffect(() => {
    if (accountId) {
      fetchTransactions(accountId);
    }
  }, [accountId]);

  const handleSaveTransaction = async (transaction: TransactionData) => {
    setError('');

    try {
      if (user) {

        /* Updating an existing transaction */
        if (transaction.id) {
          await transactionService.updateTransaction(transaction.id, transaction);
        } 
        
        /* Creating new transaction */
        if (!transaction.id && user.id){
          await transactionService.createTransaction({...transaction});
        }
      }
      if (accountId) {
        fetchTransactions(accountId);
      }
    } catch (error) {
      console.error('Error saving transaction.', error);
      setError('Error saving transaction.');
    }
  };

  const handleDeleteTransaction = async (transaction: TransactionData) => {
    setError('');
    try {
      if (!transaction.id) throw Error();

      await transactionService.deleteTransaction(transaction.id);
      if (accountId) {
        fetchTransactions(accountId);
      }
    } catch (error) {
      setError('Error deleting transaction.');
    }
  }

  const handleEditTransaction = (transaction: TransactionData) => {
    setTransactionToEdit(transaction);
  };

  return (
    <div>
      <ErrorMessage message={error}></ErrorMessage>
      <TransactionForm setAccountId={setAccountId} accounts={accounts} categories={categories} onSubmit={handleSaveTransaction} transactionToEdit={transactionToEdit}></TransactionForm>
      <TransactionList onEdit={handleEditTransaction} onRemove={handleDeleteTransaction} transactions={transactions}></TransactionList>
    </div>
  );
};

export default Transactions;
