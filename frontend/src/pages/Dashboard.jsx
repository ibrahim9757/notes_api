// src/pages/Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchNotes, fetchCategories, deleteNote, toggleArchive } from '../services/api';
import NoteCard from '../components/NoteCard';
import Pagination from '../components/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current query parameters
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const archived = searchParams.get('archived') || ''; // 'true' or 'false'
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 10; // Hardcoded limit for pagination

  const loadNotes = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search,
        category,
        archived,
        page,
        limit,
      };
      const response = await fetchNotes(params);
      setNotes(response.data.notes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setNotes([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [search, category, archived, page]);

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);


  // Handlers
  const handleSearchChange = (e) => {
    setSearchParams({ search: e.target.value, category, archived, page: 1 });
  };

  const handleCategoryChange = (e) => {
    setSearchParams({ search, category: e.target.value, archived, page: 1 });
  };

  const handleArchivedChange = (e) => {
    // Convert checkbox boolean to string 'true'/'false' or ''
    const newArchived = e.target.checked ? 'true' : '';
    setSearchParams({ search, category, archived: newArchived, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ search, category, archived, page: newPage });
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        // Reload notes after deletion
        loadNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note.');
      }
    }
  };

  const handleToggleArchive = async (id) => {
    try {
      await toggleArchive(id);
      // Reload notes after archiving/unarchiving
      loadNotes();
    } catch (error) {
      console.error('Error toggling archive status:', error);
      alert('Failed to update archive status.');
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Your Notes</h1>
        <Link 
          to="/create" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-150"
        >
          + Create New Note
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search by title or content..."
            value={search}
            onChange={handleSearchChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category Filter</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Archived Filter */}
        <div className="flex items-end">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={archived === 'true'}
              onChange={handleArchivedChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">Show Archived Notes</span>
          </label>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : notes.length === 0 ? (
        <p className="text-center text-xl text-gray-500 mt-10">No notes found matching your criteria. Why not create one?</p>
      ) : (
        <>
          {/* Notes List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onDelete={handleDelete}
                onToggleArchive={handleToggleArchive}
              />
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
