export type CompaniesStatus = 'completed' | 'pending' | 'failed';

export interface Companies {
  companyName: string;
  address: string;
  officeId: string;
  email: string;
  city: string;
  phoneNo: string;
  state: string;
  country: string;
}
