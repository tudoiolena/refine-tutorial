export interface BaseEntity {
  id: number;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface Post extends BaseEntity {
  title: string;
  body: string;
  userId: number;
}

export interface TransformedUser {
  id: number;
  title: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: string;
}

export interface TransformedPost {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface QueryParams {
  _start?: string;
  _end?: string;
  _sort?: string;
  _order?: string;
  [key: string]: string | undefined;
}

export interface ResourceService {
  getOne(id: string): Promise<any>;
  getList(params: string): Promise<any[]>;
  create(variables: any): Promise<any>;
  update(id: string, variables: any): Promise<any>;
}

export interface DataMapper {
  mapOne(data: any): any;
  mapList(data: any[]): any[];
} 