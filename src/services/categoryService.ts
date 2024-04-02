import { CategoryData } from "../types/types";
import api from "./api";

const categoryService = {
  createCategory: async (categoryData: CategoryData): Promise<CategoryData> => {
    const response = await api.post('categories', categoryData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  updateCategory: async (categoryId: number, categoryData: CategoryData): Promise<CategoryData> => {
    const response = await api.put(`categories/${categoryId}`, categoryData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  deleteCategory: async (categoryId: number): Promise<void> => {
    await api.delete(`categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  },

  listCategoriesByUser: async (userId: number): Promise<CategoryData[]> => {
    const response = await api.get(`users/${userId}/categories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },
};

export default categoryService;