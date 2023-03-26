export type Column = {
  id: string;
  label: string;
  minWidth: number;
  format?: (value: number) => string;
};