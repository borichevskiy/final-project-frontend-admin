export type Column = {
  id: string;
  label: string;
  minWidth: number;
  format?: (value: number) => string;
};

export type RowsUsers = {
  name: string;
  email: string;
  phone: number;
  address: string;
  status: string;
  role_name: string;
  role_type: string;
};

export type RowsRoles = {
  name: string;
  role_name: string;
  role_type: string;
  permission: string;
};

export type RowsCategories = {
  name: string;
  description: string;
};

