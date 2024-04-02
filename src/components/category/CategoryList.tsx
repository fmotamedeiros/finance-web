import React from 'react';
import CategoryItem from './CategoryItem';
import { CategoryData } from '../../types/types';

interface Props {
  categories: CategoryData[];
  onEdit: (category: CategoryData) => void;
  onRemove: (category: CategoryData) => void;
}

const CategoryList: React.FC<Props> = ({ categories, onEdit, onRemove }) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul className="entity-list">
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            onEdit={() => onEdit(category)}
            onRemove={() => onRemove(category)}
          />
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
