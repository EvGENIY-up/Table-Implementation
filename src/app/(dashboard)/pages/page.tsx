"use client";

import { DataTable } from "@/components/DataTable/DataTable";
import { pagesData } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorageData";
import { Page, TableColumn } from "@/types/dataTypes";
import { useEffect, useState } from "react";

export default function PagesPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [pages, setPages] = useLocalStorage<Page[]>("pages", pagesData);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const columns: TableColumn<Page>[] = [
    {
      key: "title",
      header: "Title",
      editable: true,
      inputType: "text",
    },
    {
      key: "active",
      header: "Status",
      render: (item) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.active ? "Active" : "Inactive"}
        </span>
      ),
      editable: true,
      inputType: "checkbox",
    },
    {
      key: "updatedAt",
      header: "Last Updated",
      render: (item) => new Date(item.updatedAt).toLocaleDateString(),
    },
    {
      key: "publishedAt",
      header: "Published At",
      render: (item) => new Date(item.publishedAt).toLocaleDateString(),
    },
    { key: "actions", header: "Actions" },
  ];

  if (!isInitialized) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pages</h1>
      <DataTable data={pages} columns={columns} onUpdate={setPages} />
    </div>
  );
}
