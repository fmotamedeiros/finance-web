import React, { useState, useEffect } from 'react';
import categoryService from '../services/categoryService';
import { CategoryData } from '../types/types';
import { useUser } from '../context/UserContext';
import CategoryList from '../components/category/CategoryList';
import CategoryForm from '../components/category/CategoryForm';
import ErrorMessage from '../components/ErrorMessage';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryData | null>(null);
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

  const handleSaveCategory = async (category: CategoryData) => {
    try {
      if (user && user.id) {
        /* Updating an existing category */
        if (category.id) {
          await categoryService.updateCategory(category.id, category);
        } 
        
        /* Creating new category */
        if (!category.id && user.id){
          await categoryService.createCategory(category);
        }

        fetchCategories();
      }
    } catch (error) {
      console.error('Error saving category.', error);
      setError('Error saving category.');
    }
  };

  const handleDeleteCategory = async (category: CategoryData) => {
    try {
      if (!category.id) throw Error();

      if (user && user.id) {
        await categoryService.deleteCategory(category.id);
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category.', error);
      setError('Error deleting category.');
    }
  }

  const handleEditCategory = (category: CategoryData) => {
    setCategoryToEdit(category);
  };

  return (
    <div>
      <ErrorMessage message={error}></ErrorMessage>
      <CategoryForm onSubmit={handleSaveCategory} categoryToEdit={categoryToEdit}></CategoryForm>
      <CategoryList categories={categories} onRemove={handleDeleteCategory} onEdit={handleEditCategory}></CategoryList>
    </div>
  );
};

export default Categories;
