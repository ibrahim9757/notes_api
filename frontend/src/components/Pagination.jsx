// src/components/Pagination.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Adjust as needed
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start + 1 < maxPagesToShow) {
        start = Math.max(1, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const baseClasses = "mx-1 px-3 py-1 rounded-md text-sm font-medium transition duration-150";
  const activeClasses = "bg-indigo-600 text-white shadow-md";
  const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${baseClasses} ${inactiveClasses} ${currentPage === 1 ? disabledClasses : ''} flex items-center`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${baseClasses} ${number === currentPage ? activeClasses : inactiveClasses}`}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${baseClasses} ${inactiveClasses} ${currentPage === totalPages ? disabledClasses : ''} flex items-center`}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination;
