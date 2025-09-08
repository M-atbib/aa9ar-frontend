export interface Material {
  project_id: string;
  category_id: string;
  label: string;
  quantity: number;
  unit: string;
  unit_cost: number;
  note: string;
  entry_date: string;
}

export interface Workforce {
  project_id: string;
  category_id: string;
  label: string;
  total_cost: number;
  note: string;
  entry_date: string;
}

export interface OtherExpenses {
  project_id: string;
  label: string;
  total_cost: number;
  note: string;
  entry_date: string;
}

export interface Recap {
  designation: string;
  total_price: number;
  partners: {
    name: string;
    amount: number;
  }[];
}
