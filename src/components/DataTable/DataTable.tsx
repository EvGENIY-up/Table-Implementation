'use client';

import React, { useState } from 'react';
import { TableColumn, Entity } from '@/types/dataTypes';
import { EditModal } from './EditModal';
import { TableHeader } from './TableHeader';

interface DataTableProps<T extends Entity> {
  data: T[];
  columns: TableColumn<T>[];
  onUpdate: (updatedData: T[]) => void;
}

export function DataTable<T extends Entity>({
                                              data,
                                              columns,
                                              onUpdate,
                                            }: DataTableProps<T>) {
  const [filter, setFilter] = useState('');
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const filteredData = data.filter(item =>
    Object.values(item).some(
      value => typeof value === 'string' &&
        value.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const handleSave = (updatedItem: T) => {
    const updatedData = data.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    onUpdate(updatedData);
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
              key={String(column.key)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {filteredData.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => {
              if (column.key === 'actions') {
                return (
                  <td key="actions" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  </td>
                );
              }

              return (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T])}
                </td>
              );
            })}
          </tr>
        ))}
        </tbody>
      </table>

      {editingItem && (
        <EditModal
          item={editingItem}
          columns={columns.filter(col => col.editable)}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}