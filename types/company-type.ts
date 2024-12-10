export interface Company {
  id: string;
  name: string;
  city: string;
  managers: string[];
  associates: {
    id: string;
    percentage: number;
  }[];
  created_at: string;
  updated_at: string;
}

export interface CompanyKPI {
  company_id: string;
  company_name: string;
  total_projects_value: number;
  total_company_expenses: number;
  cumulative_profit: {
    expected_profit: number;
    actual_profit: number;
    profit_variance: number;
  };
  roi_metrics: {
    total_investment: number;
    total_revenue: number;
    total_expenses: number;
    roi_percentage: number;
  };
  total_projects: number;
}
