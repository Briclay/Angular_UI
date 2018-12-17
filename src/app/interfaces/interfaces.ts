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

export interface Product {
  name: string;
}

export interface Station {
  name: string;
  line: string;
}