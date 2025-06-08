'use client';

import React, { useState } from 'react';
import EditModal from './EditModal';
import TableHeader from './TableHeader';

interface DataTableProps {
  data: any[];
  columns: any[];
  onUpdate: (updatedItem: any) => void;
}

export default function DataTable({
  data,
  columns,
  onUpdate
}: DataTableProps) {
  const [filter, setFilter] = useState('');
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const filteredData = data.filter(item =>
    Object.values(item).some(
      value => typeof value === 'string' &&
        value.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  const handleSave = (updatedItem: any) => {
    onUpdate(updatedItem);
    setEditingItem(null);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <TableHeader filter={filter} setFilter={setFilter} />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => {
                if (column.key === 'actions') {
                  return (
                    <td
                      key="actions"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    </td>
                  );
                }

                const value = item[column.key];
                return (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {column.render
                      ? column.render(item)
                      : String(value)}
                  </td>
                );
              })}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="px-6 py-4 text-center text-sm text-gray-500"
            >
              No matching records found
            </td>
          </tr>
        )}
        </tbody>
      </table>

      {editingItem && (
        <EditModal
          item={editingItem}
          columns={columns.filter((col: any) => col.editable)}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}