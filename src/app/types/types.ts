import { ReactNode } from "react";

export type PropsForm = {
  children: ReactNode;
  buttonTitle: string;
  formTitle: string;
  handleSubmit: React.FormEventHandler<HTMLFormElement>
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