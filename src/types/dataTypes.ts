// Базовый тип для всех сущностей
export type Entity = {
  id: number;
  active: boolean;
};

export type Product = Entity & {
  name: string;
  options: {
    size: string;
    amount: number;
  };
  createdAt: string;
};

export type PricePlan = Entity & {
  description: string;
  createdAt: string;
  removedAt: string;
};

export type Page = Entity & {
  title: string;
  updatedAt: string;
  publishedAt: string;
};

// Обобщенный тип для колонок таблицы
export type ColumnConfig<T> = {
  key: keyof T | "actions";
  header: string;
  render?: (item: T) => React.ReactNode;
  editable?: boolean;
  inputType?: "text" | "textarea" | "checkbox";
};

// Тип для навигации
export type DataType = "products" | "price-plans" | "pages";