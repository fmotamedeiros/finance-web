import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';
import { CategoryResponse } from '../types/types';
import { useUser } from '../context/UserContext';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [error, setError] = useState('');

  const { user } = useUser();

  const fetchCategories = async () => {
    try {
      if (user && user.id) {
        const response = await categoryService.listCategoriesByUser(user?.id);
        setCategories(response);
      }
    } catch (error) {
      console.error('Error listing categories.', error);
      setError('Error listing categories.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      if (user && user.id) {
        await categoryService.createCategory({ userId: user.id, name: newCategoryName });
        setNewCategoryName('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Error registering category.', error);
      setError('Error registering category.');
    }
  };

  const handleCategoryTransaction = async (categoryId: number) => {
    try {
      if (user && user.id) {
        await categoryService.deleteCategory(categoryId);
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category.', error);
      setError('Error deleting category.');
    }
  }

  return (
    <div>
      <h2>Add Category</h2>
      <div className='form-container'>
        <div className="form-group">
          <label htmlFor="name">Category Name:</label>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button className='add-button' onClick={handleAddCategory}>Add Category</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {categories.length > 0 && <h2>Categories</h2>}
      <ul className="entity-list">
        {categories.map((category) => (
          <li key={category.id} className="entity-item">
            <span>{category.name}</span>
            <button className="delete-button" onClick={() => handleCategoryTransaction(category.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
