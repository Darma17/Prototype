export type User = {
  id: string;
  name: string;
  email: string;
  role: 'seeker' | 'employer';
  avatarUrl: string;
  skills: string[];
};

export type Company = {
  id: string;
  name: string;
  logoUrl: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  salary: number;
  type: 'Harian' | 'Mingguan' | 'Bulanan';
  location: string;
  status: 'Aktif' | 'Ditutup';
  skills: string[];
  company: Company;
};
