// src/pages/EditNotePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchNoteById, updateNote, fetchCategories } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const EditNotePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '', category: '' });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadNoteAndCategories = async () => {
      try {
        const [noteRes, categoriesRes] = await Promise.all([
          fetchNoteById(id),
          fetchCategories()
        ]);

        const note = noteRes.data;
        setCategories(categoriesRes.data);
        setFormData({
          title: note.title,
          content: note.content,
          // Ensure category is the ID string
          category: note.category?._id || ''
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load note or categories.');
      } finally {
        setLoading(false);
      }
    };
    loadNoteAndCategories();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simple validation for category
    const dataToSend = { ...formData };
    if (!dataToSend.category) {
        setError('Please select a category.');
        setLoading(false);
        return;
    }

    try {
      await updateNote(id, dataToSend);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update note.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error && error !== 'Failed to load note or categories.') return <p className="text-red-500 text-center mt-10">{error}</p>;


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Edit Note</h1>
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
          {loading ? 'Saving...' : 'Update Note'}
        </button>
      </form>
    </div>
  );
};

export default EditNotePage;
