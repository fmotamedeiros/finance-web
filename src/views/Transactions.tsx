import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import categoryService from '../services/categoryService';
import accountService from '../services/accountService';
import { useUser } from '../context/UserContext';
import { AccountResponse, CategoryResponse, TransactionResponse } from '../types/types';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [accountId, setAccountId] = useState<number | ''>('');
  const [error, setError] = useState('');

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

  const handleAddTransaction = async () => {
    if (!date || !description || !value || !categoryId || !accountId) {
      setError('Please, fill all fields.');
      return;
    }
    try {
      const newTransaction = await transactionService.createTransaction({
        accountId: Number(accountId),
        categoryId: Number(categoryId),
        date,
        description,
        value: Number(value),
        type,
      });
      setTransactions([...transactions, newTransaction]);
      
      // Cleaning form fields
      setDate('');
      setDescription('');
      setValue('');
      setType('expense');
      setCategoryId('');
      setAccountId('');

    } catch (error) {
      console.error('Error registering transaction.', error);
      setError('Error registering transaction.');
    }
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    await transactionService.deleteTransaction(transactionId);
    if (accountId) {
      fetchTransactions(accountId);
    }
  }

  return (
    <div>
      <h2>New Transaction</h2>
      <div className='form-container'>
        <div className="form-group">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
        </div>
        <div className="form-group">
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor" />
        </div>
        <div className="form-group">
          <select value={type} onChange={(e) => setType(e.target.value as 'expense' | 'income')}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <select value={accountId} onChange={(e) => setAccountId(Number(e.target.value))}>
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>{account.name}</option>
            ))}
          </select>
        </div>
        <button className="add-button" onClick={handleAddTransaction}>Add Transaction</button>
      </div>
      { transactions.length > 0 && <h2>Transactions</h2> }
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="entity-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="entity-item">
            <span>{`${transaction.description} - $${transaction.value} (${transaction.type})`}</span>
            <button className="delete-button" onClick={() => handleDeleteTransaction(transaction.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
