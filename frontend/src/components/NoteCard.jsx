// src/components/NoteCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Archive, Edit3, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onDelete, onToggleArchive }) => {
  const isArchived = note.archived;
  const contentPreview = note.content.length > 100 
    ? note.content.substring(0, 100) + '...' 
    : note.content;

  return (
    <div className={`bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between h-full transition duration-300 ${isArchived ? 'border-l-4 border-yellow-500 opacity-80' : 'border-l-4 border-indigo-500 hover:shadow-xl'}`}>
      <div>
        <h3 className={`text-xl font-bold mb-2 ${isArchived ? 'text-yellow-700' : 'text-gray-800'}`}>
          {isArchived && '[Archived] '}
          {note.title}
        </h3>
        {note.category && (
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full mb-3">
            {note.category.name}
          </span>
        )}
        <p className="text-gray-600 text-sm mb-4 whitespace-pre-wrap">
          {contentPreview}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-3 border-t border-gray-100">
        
        {/* Archive/Unarchive Button */}
        <button
          onClick={() => onToggleArchive(note._id)}
          title={isArchived ? 'Unarchive' : 'Archive'}
          className={`p-2 rounded-full transition duration-150 ${isArchived 
            ? 'text-yellow-600 hover:bg-yellow-100' 
            : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <Archive className="w-5 h-5" />
        </button>

        {/* Edit Button */}
        <Link 
          to={`/edit/${note._id}`}
          title="Edit Note"
          className="p-2 rounded-full text-indigo-600 hover:bg-indigo-100 transition duration-150"
        >
          <Edit3 className="w-5 h-5" />
        </Link>
        
        {/* Delete Button */}
        <button
          onClick={() => onDelete(note._id)}
          title="Delete Note"
          className="p-2 rounded-full text-red-500 hover:bg-red-100 transition duration-150"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
