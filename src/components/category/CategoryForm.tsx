import React, { useState, useEffect } from 'react';
import { CategoryData } from '../../types/types';

interface Props {
  onSubmit: (category: CategoryData) => void;
  categoryToEdit: CategoryData | null;
}

const CategoryForm: React.FC<Props> = ({ onSubmit, categoryToEdit }) => {
  const [category, setCategory] = useState<CategoryData>({ id: 0, userId: 0, name: '' });

  useEffect(() => {
    if (categoryToEdit) {
      setCategory(categoryToEdit);
    } else {
      setCategory({ id: 0, userId: 0, name: '' });
    }
  }, [categoryToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(category);
    setCategory({ id: 0, userId: 0, name: '' });
  };

  return (
    <div>
      <h2>Category</h2>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Category Name:</label>
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              required
            />
          </div>
          <button className='add-button' type="submit">{categoryToEdit?.id ? 'Update' : 'Add'} Category</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
