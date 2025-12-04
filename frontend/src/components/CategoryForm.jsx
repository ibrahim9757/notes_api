// src/components/CategoryForm.jsx
import React, { useState, useEffect } from 'react';

const CategoryForm = ({ initialName = '', onSubmit, onCancel, isEditing = false }) => {
  const [name, setName] = useState(initialName);

  // Sync internal state when external initialName changes (for editing)
  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name);
    if (!isEditing) {
      setName(''); // Clear form on creation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isEditing ? 'Update' : 'Create'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
