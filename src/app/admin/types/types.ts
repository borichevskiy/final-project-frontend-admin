import { ReactNode } from "react";

export type PropsForm = {
  children: ReactNode;
  buttonTitle: string;
  formTitle: string;
};

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

export type NavParams = {
  icon: ReactNode;
  text: string;
  navigatePath: string;
};

export type Props = {
  children: ReactNode;
  nav: Array<NavParams>;
  title: string;
};

export type PropsType = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};