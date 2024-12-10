export interface Terrain {
  surface: number;
  price: number;
  borders: number;
  number_of_floors: number;
}

export interface GlobalInfo {
  count: number;
  profit_margin: number;
}

export interface Unit {
  type: "APARTMENT" | "COMMERCIAL";
  unit_number: string;
  floor: number;
  surface: number;
  surface_habitable?: number;
  sous_sol?: number;
  rez_de_chaussee?: number;
  mezzanine?: number;
  price: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD";
}

export interface Project {
  _id: string;
  company_id: string;
  name: string;
  address: string;
  city: string;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED";
  terrain: Terrain;
  global_apartments_info: GlobalInfo;
  global_commercial_info: GlobalInfo;
  total_budget: number;
  current_expenses: number;
  start_date: string;
  end_date: string;
  units: Unit[];
}

export interface MainInfoForm {
  title: string;
  address: string;
  city: string;
  budget: number;
  paperReady: boolean;
  partnership: boolean;
}

export interface LegalPaperForm {
  name: string;
  file: File;
}

export interface TerrainInfoForm {
  surface: number;
  price: number;
  borders: number;
  number_of_floors: number;
  commercial: boolean;
}

export interface UnitInfo {
  floor: number;
  surface: number;
  profit_margin: number;
}

export interface AppartementInfoForm {
  unit_number: string;
  unit: UnitInfo;
}

export interface CommercialInfoForm {
  unit_number: string;
  unit: UnitInfo;
}

export interface Partner {
  email: string;
  percentage: number;
}

export interface ProjectPartnerForm {
  number_of_partners: number;
  partners: Partner[];
}
