// src/pages/CategoriesPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/api';
import CategoryForm from '../components/CategoryForm';
import LoadingSpinner from '../components/LoadingSpinner';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCategory, setEditingCategory] = useState(null); // null or { _id, name }

  const loadCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchCategories();

      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to load categories.');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (name) => {
    try {
      await createCategory({ name });
      await loadCategories(); // Reload list
    } catch (err) {
      alert('Failed to create category.');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleUpdate = async (id, name) => {
    try {
      await updateCategory(id, { name });
      setEditingCategory(null); // Close edit form
      await loadCategories(); // Reload list
    } catch (err) {
      alert('Failed to update category.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? All related notes might be affected on the backend.')) {
      try {
        await deleteCategory(id);
        await loadCategories(); // Reload list
      } catch (err) {
        alert('Failed to delete category. It might be in use.');
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Manage Categories</h1>

      {/* Create/Edit Form */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border-t-4 border-indigo-500">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
          {editingCategory ? 'Edit Category' : 'Create New Category'}
        </h2>
        <CategoryForm
          initialName={editingCategory ? editingCategory.name : ''}
          onSubmit={editingCategory ? (name) => handleUpdate(editingCategory._id, name) : handleCreate}
          onCancel={() => setEditingCategory(null)}
          isEditing={!!editingCategory}
        />
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Category List</h2>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <ul className="divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
          {categories.map((cat) => (
            <li key={cat._id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition duration-100">
              <span className="text-lg font-medium text-gray-700">{cat.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-red-600 hover:text-red-900 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesPage;
