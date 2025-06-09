"use client";

import React, { useState, useEffect } from "react";
import { TableColumn, Entity } from "@/types/dataTypes";
import { EditModal } from "./EditModal";
import { TableHeader } from "./TableHeader";
import { Button } from "@/components/ui/button";

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
  const [filter, setFilter] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null);

  const applyFilters = (filterValue: string | null) => {
    let result = [...data];

    if (filter) {
      result = result.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(filter.toLowerCase()),
        ),
      );
    }

    if (filterValue === "active") {
      setActiveFilter(true);
      result = result.filter((item) => item.active === true);
    } else if (filterValue === "inactive") {
      setActiveFilter(false);
      result = result.filter((item) => item.active === false);
    } else {
      setActiveFilter(null);
    }

    setFilteredData(result);
  };

  useEffect(() => {
    if (activeFilter === null) {
      applyFilters(null);
    }
  }, [data, filter]);

  const handleSave = async (updatedItem: T) => {
    const updatedData = data.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    onUpdate(updatedData);
    setIsEditModalOpen(false);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <TableHeader
        filter={filter}
        setFilter={setFilter}
        onApplyFilter={applyFilters}
      />

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
                if (column.key === "actions") {
                  return (
                    <td
                      key="actions"
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
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
          item={editingItem!}
          columns={columns.filter((col) => col.editable)}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
