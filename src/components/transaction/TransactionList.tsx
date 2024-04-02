import React from 'react';
import TransactionItem from './TransactionItem';
import { TransactionData } from '../../types/types';

interface Props {
  transactions: TransactionData[];
  onEdit: (transaction: TransactionData) => void;
  onRemove: (transaction: TransactionData) => void;
}

const TransactionList: React.FC<Props> = ({ transactions, onEdit, onRemove }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul className="entity-list">
        {transactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={() => onEdit(transaction)}
            onRemove={() => onRemove(transaction)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
