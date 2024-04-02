import React, { useState, useEffect } from 'react';
import { AccountData } from '../../types/types';

interface Props {
  onSubmit: (account: AccountData) => void;
  accountToEdit: AccountData | null;
}

const AccountForm: React.FC<Props> = ({ onSubmit, accountToEdit }) => {
  const [account, setAccount] = useState<AccountData>({ id: 0, userId: 0, name: '', balance: 0 });

  useEffect(() => {
    if (accountToEdit) {
      setAccount(accountToEdit);
    } else {
      setAccount({ id: 0, userId: 0, name: '', balance: 0 });
    }
  }, [accountToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({ ...prevAccount, [name]: name === 'balance' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(account);
    setAccount({ id: 0, userId: 0, name: '', balance: 0 });
  };

  return (
    <div>
      <h2>Account</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Account Name:</label>
            <input type="text" name="name" value={account.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="balance">Initial Balance:</label>
            <input type="number" name="balance" value={account.balance.toString()} onChange={handleChange} required />
          </div>
          <button type="submit" className='add-button'>{accountToEdit?.id ? 'Update' : 'Add'} Account</button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
