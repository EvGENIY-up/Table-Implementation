'use client';

import React, { useState } from 'react';

interface EditModalProps {
  item: any;
  columns: any[];
  onClose: () => void;
  onSave: (updatedItem: any) => void;
}

export default function EditModal({
 item,
 columns,
 onClose,
 onSave
}: EditModalProps) {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (key: string, value: string | boolean) => {
    setEditedItem((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Item</h3>

          <div className="space-y-4">
            {columns.map((column: any) => {
              const value = editedItem[column.key];
              return (
                <div key={column.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {column.header}
                  </label>

                  {column.inputType === 'checkbox' ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={e =>
                          handleChange(column.key, e.target.checked)}
                        className="h-5 w-5 text-indigo-600 rounded"
                      />
                      <span className="ml-2 text-gray-700">
                        {value ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  ) : column.inputType === 'textarea' ? (
                    <textarea
                      value={String(value)}
                      onChange={e =>
                        handleChange(column.key, e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={column.inputType || 'text'}
                      value={String(value)}
                      onChange={e =>
                        handleChange(column.key, e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(editedItem)}
              className="px-4 py-2 bg-indigo-600 text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}