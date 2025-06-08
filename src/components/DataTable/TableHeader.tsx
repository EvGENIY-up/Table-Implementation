'use client';

import React, { useState } from 'react';

interface TableHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
  onApplyFilter: (filterValue: string | null) => void;
}

export function TableHeader({
                              filter,
                              setFilter,
                              onApplyFilter
                            }: TableHeaderProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const handleClearFilter = () => {
    setSelectedFilter('');
    onApplyFilter(null);
  };

  const handleApplyFilter = () => {
    onApplyFilter(selectedFilter);
  };

  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-end">
      <div className="flex relative">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search..."
          className="pl-5 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="absolute left-54 top-4 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-md mr-2 px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 appearance-none pr-10 bg-white"
            style={{ minWidth: '200px' }}
          >
            <option value="">Select filter</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Стрелочка для select */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Крестик для очистки */}
          {selectedFilter && (
            <button
              onClick={handleClearFilter}
              className="absolute right-10 top-4 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={handleApplyFilter}
          disabled={!selectedFilter}
          className={`px-6 py-3 rounded-md text-sm font-medium ${selectedFilter ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          Filter
        </button>
      </div>
    </div>
  );
}