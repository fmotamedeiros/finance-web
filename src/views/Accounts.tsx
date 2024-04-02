import React, { useState, useEffect } from 'react';
import { AccountData } from '../types/types';
import accountService from '../services/accountService';
import { useUser } from '../context/UserContext';
import AccountList from '../components/account/AccountList';
import AccountForm from '../components/account/AccountForm';
import ErrorMessage from '../components/ErrorMessage';

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [accountToEdit, setAccountToEdit] = useState<AccountData | null>(null);
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

  const handleSaveAccount = async (account: AccountData) => {
    setError('');

    try {
      if (user) {

        /* Updating an existing account */
        if (account.id) {
          await accountService.updateAccount(account.id, account);
        } 
        
        /* Creating new account */
        if (!account.id && user.id){
          await accountService.createAccount({...account, userId: user.id});
        }
      }
      fetchAccounts();
    } catch (error) {
      console.error('Error saving account.', error);
      setError('Error saving account.');
    }
  };

  const handleDeleteAccount = async (account: AccountData) => {
    setError('');
    try {
      if (!account.id) throw Error();

      await accountService.deleteAccount(account.id);
      fetchAccounts();
    } catch (error) {
      setError('Error deleting account.');
    }
  }

  const handleEditAccount = (account: AccountData) => {
    setAccountToEdit(account);
  };

  return (
    <div>
      <ErrorMessage message={error}></ErrorMessage>
      <AccountForm onSubmit={handleSaveAccount} accountToEdit={accountToEdit}></AccountForm>
      <AccountList onEdit={handleEditAccount} onRemove={handleDeleteAccount} accounts={accounts}></AccountList>
    </div>
  );
};

export default Accounts;
