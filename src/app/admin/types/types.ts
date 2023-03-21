import { ReactNode } from "react";

export type ColumnProps = {
  id: string;
  label: string;
  minWidth: number;
  format?: (value: number) => string;
};

export interface DataUsers {
  name: string;
  email: string;
  phone: number;
  address: string;
  status: string;
  role_name: string;
  role_type: string;
}

export type RowsProps = {
  name: string;
  email: string;
  phone: number;
  address: string;
  status: string;
  role_name: string;
  role_type: string;
};

export type Props = {
  children: ReactNode;
  columns: Array<ColumnProps>;
  rows: Array<RowsProps>;
};

// export type ColumnRoleProps = {
// id: string;
// label: string;
// minWidth: number;
// }

// export type RowsRoleProps = {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
// };