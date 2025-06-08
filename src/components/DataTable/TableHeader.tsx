'use client';

import React from 'react';

interface TableHeaderProps {
  filter: string;
  setFilter: (value: string) => void;
}

export function TableHeader({ filter, setFilter }: TableHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-700">Items</h2>
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter items..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 w-64"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}