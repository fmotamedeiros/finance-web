import React, { useState, useEffect } from 'react';
import { AccountResponse } from '../types/types';
import accountService from '../services/accountService';
import { useUser } from '../context/UserContext';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountResponse[]>([]);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  const { user } = useUser();

  const fetchAccounts = async () => {
    try {
      if (user && user.id) {
        const response = await accountService.listAccountsByUser(user.id);
        setAccounts(response);
      }
    } catch (error) {
      console.error('Error listing accounts.', error);
      setError('Error listing accounts.');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const formattedBalance = parseFloat(balance);
    if (!isNaN(formattedBalance) && formattedBalance >= 0) {
      try {
        await accountService.createAccount({ userId: user?.id, name, balance: formattedBalance });
        console.log('Account registered:', { userId: user?.id, name, balance });
        setName('');
        setBalance('');
        fetchAccounts();
      } catch (error) {
        setError('Error registering account.');
      }
    } else {
      setError('Invalid initial balance.');
    }
  };

  const handleAccountTransaction = async (accountId: number) => {
    setError('');
    try {
      await accountService.deleteAccount(accountId);
      fetchAccounts();
    } catch (error) {
      setError('Error deleting account.');
    }
  }

  return (
    <div>
      <h2>Add Account</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Account Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="balance">Initial Balance:</label>
            <input
              type="number"
              id="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="add-button">Add Account</button>
        </form>
      </div>
      {accounts.length > 0 && <h2>Accounts</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul className="entity-list">
        {accounts.map(account => (
          <li key={account.id} className="entity-item">
            <span>{account.name} - Saldo: {account.balance}</span>
            <button className="delete-button" onClick={() => handleAccountTransaction(account.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accounts;
