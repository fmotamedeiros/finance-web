import React from 'react';
import { CategoryData } from '../../types/types';

interface Props {
  category: CategoryData;
  onEdit: () => void;
  onRemove: () => void;
}

const CategoryItem: React.FC<Props> = ({ category, onEdit, onRemove }) => {
  return (
    <li className="entity-item">
      {category.name}
      <div className="button-container">
        <button className="edit-button" onClick={onEdit}>Edit</button>
        <button className="delete-button" onClick={onRemove}>Remove</button>
      </div>
    </li>
  );
};

export default CategoryItem;
