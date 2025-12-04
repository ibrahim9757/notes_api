// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchProfile();
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Your Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-lg text-gray-900">{profile.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Member Since</label>
          <p className="mt-1 text-lg text-gray-900">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
