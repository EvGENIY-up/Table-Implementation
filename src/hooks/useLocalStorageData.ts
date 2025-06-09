"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialData: T[],
): [T[], (data: T[]) => void] {
  const [data, setData] = useState<T[]>(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : initialData;
    }
    return initialData;
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setData(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  const updateData = (newData: T[]) => {
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
  };

  return [data, updateData];
}
