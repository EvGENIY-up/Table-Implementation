'use client';

import  DataTable from '@/components/DataTable/DataTable';
import { Product, ColumnConfig } from '@/types/dataTypes';
import { productsData } from '@/data/mockData';
import { useState }  from 'react';

export default function ProductsPage() {
  // Используем useState для управления состоянием данных на клиенте
  const [products, setProducts] = useState<Product[]>(productsData);

  const columns: ColumnConfig<Product>[] = [
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

  const handleUpdate = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <DataTable
        data={products}
        columns={columns}
        onUpdate={handleUpdate}
      />
    </div>
  );
}