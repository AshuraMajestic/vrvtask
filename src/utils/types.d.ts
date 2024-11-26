export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  role?: string;
  isActive: boolean;
}

export interface Role {
  id: string;
  name: string;
  read: boolean;
  edit: boolean;
  delete: boolean;
}
