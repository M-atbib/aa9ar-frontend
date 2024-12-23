export interface BaseUnit {
  _id: string;
  project_id: string;
  client_id: string | null;
  unit_number: string;
  floor: number;
  type: "APARTMENT" | "COMMERCIAL";
  surface: number;
  price: number;
  status: "AVAILABLE" | "RESERVED" | "SOLD";
  reservation_date: string | null;
  sale_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApartmentUnit extends BaseUnit {
  type: "APARTMENT";
  surface_habitable: number;
}

export interface CommercialUnit extends BaseUnit {
  type: "COMMERCIAL";
  sous_sol: number;
  rez_de_chaussee: number;
  mezzanine: number;
}

export interface ProjectUnits {
  apartments: ApartmentUnit[];
  commercial: CommercialUnit[];
}
