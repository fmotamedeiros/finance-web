import React from 'react';
import { AccountData } from '../../types/types';

interface Props {
  account: AccountData;
  onEdit: (account: AccountData) => void;
  onRemove: (account: AccountData) => Promise<void>;
}

const AccountItem: React.FC<Props> = ({ account, onEdit, onRemove }) => {
  return (
    <li key={account.id} className="entity-item">
      {account.name} (R$ {account.balance})
      <div className="button-container">
        <button className="edit-button" onClick={() => onEdit(account)}>Edit</button>
        <button className="delete-button" onClick={() => onRemove(account)}>Remove</button>
      </div>
    </li>
  );
};

export default AccountItem;