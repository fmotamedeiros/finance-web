// TransactionForm.tsx
import React, { useState, useEffect } from 'react';
import { AccountData, CategoryData, TransactionData } from '../../types/types';

interface Props {
  onSubmit: (transaction: TransactionData) => void;
  transactionToEdit: TransactionData | null;
  categories: CategoryData[];
  accounts: AccountData[];
  setAccountId: (accountId: number) => void;
}

const TransactionForm: React.FC<Props> = ({ onSubmit, transactionToEdit, categories, accounts, setAccountId }) => {
  const [transaction, setTransaction] = useState<TransactionData>({
    id: 0,
    value: 0,
    description: '',
    categoryId: 0,
    accountId: 0,
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (transactionToEdit) {
      setTransaction(transactionToEdit);
    }
  }, [transactionToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: (name === 'amount' || name === 'value') ? parseFloat(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(transaction);
    setTransaction({
      id: 0,
      value: 0,
      description: '',
      categoryId: 0,
      accountId: 0,
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div>
      <h2>Transaction</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Transaction Name:</label>
            <input type="text" name="description" value={transaction.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Account:</label>
            <select value={transaction.accountId} onChange={(e) => { setTransaction({...transaction, accountId: Number(e.target.value)}); setAccountId(Number(e.target.value)); }}>
              <option value="">Select an account</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>{account.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select value={transaction.categoryId} onChange={(e) => { setTransaction({...transaction, categoryId: Number(e.target.value)}) }}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" value={transaction.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Value:</label>
            <input type="number" name="value" value={transaction.value} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Type:</label>
            <select value={transaction.type} onSelect={(e) => { }}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button type="submit">{transactionToEdit?.id ? 'Update' : 'Add'} Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
