export interface BreadCrumb {
    label: string;
    url: string;
};

export interface User {
  email:string;
  uuid: string;
  homeProduct: string;
  profiles: string[];
}

export interface ChartData {
  name: string;
  color: string;
  values: { date: string, value: number }[];
}