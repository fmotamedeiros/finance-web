import React from 'react';
import { TransactionData } from '../../types/types';

interface Props {
  transaction: TransactionData;
  onEdit: () => void;
  onRemove: () => void;
}

const TransactionItem: React.FC<Props> = ({ transaction, onEdit, onRemove }) => {
  return (
    <li className="entity-item">
      {transaction.description} (R$ {transaction.value})
      <div className="button-container">
        <button className="edit-button" onClick={onEdit}>Edit</button>
        <button className="delete-button" onClick={onRemove}>Remove</button>
      </div>
    </li>
  );
};

export default TransactionItem;
