export interface FbProductResponse {
  name: string;
}

export interface Product {
  id?: string;
  type?: string;
  title?: string;
  photo?: string;
  info?: string;
  price?: string;
  date?: Date;
}

export interface Order {
  name?: string;
  phone?: string;
  payment?: string;
  address?: string;
  price?: number;
  orders?: Product[];
  date?: Date;
}
