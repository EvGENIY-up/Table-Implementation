'use client';

import { DataTable } from '@/components/DataTable/DataTable';
import { productsData } from '@/data/mockData';
import { useLocalStorage } from '@/hooks/useLocalStorageData';
import { Product, TableColumn } from '@/types/dataTypes';
import { useEffect, useState } from 'react';

// Клиентский компонент
export default function ProductsPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [products, setProducts] = useLocalStorage<Product[]>('products', productsData);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const columns: TableColumn<Product>[] = [
    {
      key: 'name',
      header: 'Name',
      editable: true,
      inputType: 'text'
    },
    {
      key: 'options',
      header: 'Options',
      render: (item) => (
        <span>
          Size: {item.options.size}, Amount: {item.options.amount}
        </span>
      )
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
      key: 'createdAt',
      header: 'Created',
      render: (item) => new Date(item.createdAt).toLocaleDateString()
    },
    { key: 'actions', header: 'Actions' }
  ];

  if (!isInitialized) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <DataTable
        data={products}
        columns={columns}
        onUpdate={setProducts}
      />
    </div>
  );
}