export interface Entity {
  id: number;
  [key: string]: any;
}

export interface Product extends Entity {
  name: string;
  options: {
    size: string;
    amount: number;
  };
  active: boolean;
  createdAt: string;
}

export interface PricePlan extends Entity {
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

export interface Page extends Entity {
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

export interface TableColumn<T> {
  key: keyof T | 'actions';
  header: string;
  editable?: boolean;
  inputType?: 'text' | 'textarea' | 'checkbox' | 'number';
  render?: (item: T) => React.ReactNode;
}