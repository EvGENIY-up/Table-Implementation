"use client";

import { DataTable } from "@/components/DataTable/DataTable";
import { pricePlansData } from "@/data/mockData";
import { useLocalStorage } from "@/hooks/useLocalStorageData";
import { PricePlan, TableColumn } from "@/types/dataTypes";
import { useEffect, useState } from "react";

export default function PricePlansPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [pricePlans, setPricePlans] = useLocalStorage<PricePlan[]>(
    "pricePlans",
    pricePlansData,
  );

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const columns: TableColumn<PricePlan>[] = [
    {
      key: "description",
      header: "Description",
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
      key: "createdAt",
      header: "Created",
      render: (item) => new Date(item.createdAt).toLocaleDateString(),
    },
    {
      key: "removedAt",
      header: "Removed",
      render: (item) => new Date(item.removedAt).toLocaleDateString(),
    },
    { key: "actions", header: "Actions" },
  ];

  if (!isInitialized) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Price Plans</h1>
      <DataTable data={pricePlans} columns={columns} onUpdate={setPricePlans} />
    </div>
  );
}
