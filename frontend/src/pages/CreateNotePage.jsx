// src/pages/CreateNotePage.jsx
import React, { useState, useEffect } from 'react';
import { createNote, fetchCategories } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateNotePage = () => {
  const [formData, setFormData] = useState({ title: '', content: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        const data = Array.isArray(response.data) ? response.data : [];
        setCategories(data);
        if (data.length > 0) {
          // Set the first category as default if none is set
          setFormData(f => ({ ...f, category: data[0]._id }));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate category selection
    const dataToSend = { ...formData };
    if (!dataToSend.category) {
        setError('Please select a category.');
        setLoading(false);
        return;
    }

    try {
      await createNote(dataToSend);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create note.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Create New Note</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="8"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150"
        >
          {loading ? 'Saving...' : 'Create Note'}
        </button>
      </form>
    </div>
  );
};

export default CreateNotePage;
