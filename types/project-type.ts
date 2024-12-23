// Project creation interfaces
export interface TerrainForm {
  surface: number;
  price: number;
  borders: number;
  number_of_floors: number;
}

export interface GlobalApartmentsInfo {
  count: number;
  profit_margin: number;
}

export interface GlobalCommercialInfo {
  count: number;
  profit_margin: number;
}

export interface ProjectUnit {
  type: "APARTMENT" | "COMMERCIAL";
  unit_number: string;
  floor: number;
  surface: number;
  price: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD";
  surface_habitable?: number; // For apartments
  sous_sol?: number; // For commercial
  rez_de_chaussee?: number; // For commercial
  mezzanine?: number; // For commercial
}

export interface CreateProjectPayload {
  company_id: string;
  name: string;
  address: string;
  city: string;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  total_budget: number;
  current_expenses: number;
  start_date: string;
  end_date: string;
  terrain: TerrainForm;
  global_apartments_info: GlobalApartmentsInfo;
  global_commercial_info: GlobalCommercialInfo;
  units: ProjectUnit[];
}

// Project response interfaces
export interface Project {
  id: string;
  company_id: string;
  name: string;
  address: string;
  city: string;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  terrain: TerrainForm;
  global_apartments_info: GlobalApartmentsInfo;
  global_commercial_info: GlobalCommercialInfo;
  total_budget: number;
  current_expenses: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectKpisBreakdown {
  material_costs: number;
  workforce_costs: number;
  other_expenses: number;
  total_units: number;
  available_units: number;
  sold_units: number;
}

export interface ProjectKpis {
  project_id: string;
  total_losses: number;
  remaining_total: number;
  expected_profit: number;
  total_project_budget: number;
  project_end_date: string;
  project_status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  breakdown: ProjectKpisBreakdown;
}

export interface Partner {
  email: string;
  percentage: number;
}
