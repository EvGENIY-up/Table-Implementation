'use client';

import  DataTable from '@/components/DataTable/DataTable';
import { Page, ColumnConfig } from '@/types/dataTypes';
import { pagesData } from '@/data/mockData';
import { useState } from 'react';

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>(pagesData);

  const columns: ColumnConfig<Page>[] = [
    {
      key: 'title',
      header: 'Title',
      editable: true,
      inputType: 'text'
    },
    {
      key: 'active',
      header: 'Status',
      render: (item) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          item.active
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {item.active ? 'Active' : 'Inactive'}
        </span>
      ),
      editable: true,
      inputType: 'checkbox'
    },
    {
      key: 'updatedAt',
      header: 'Updated',
      render: (item) => new Date(item.updatedAt).toLocaleDateString()
    },
    {
      key: 'publishedAt',
      header: 'Published',
      render: (item) => new Date(item.publishedAt).toLocaleDateString()
    },
    { key: 'actions', header: 'Actions' }
  ];

  const handleUpdate = (updatedPage: Page) => {
    setPages(prev => prev.map(p =>
      p.id === updatedPage.id ? updatedPage : p
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pages</h1>
      <DataTable
        data={pages}
        columns={columns}
        onUpdate={handleUpdate}
      />
    </div>
  );
}