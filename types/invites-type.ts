export interface InvitedPartner {
  _id: string;
  project_id: string;
  email: string;
  percentage: number;
  status: string;
}

export interface CompanyInvite {
  _id: string;
  email: string;
  status: string;
  expires_at: string;
  company_name: string;
  manager_name: string;
}
