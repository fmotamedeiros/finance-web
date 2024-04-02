import React from 'react';
import AccountItem from './AccountItem';
import { AccountData } from '../../types/types';

interface Props {
  accounts: AccountData[];
  onEdit: (account: AccountData) => void;
  onRemove: (account: AccountData) => Promise<void>;
}

const AccountList: React.FC<Props> = ({ accounts, onEdit, onRemove }) => {
  return (
    <div>
      <h2>Accounts</h2>
      <ul className="entity-list">
        {accounts.map((account) => (
          <AccountItem key={account.id} account={account} onEdit={() => onEdit(account)} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
