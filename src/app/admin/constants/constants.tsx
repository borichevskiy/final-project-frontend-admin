import PeopleIcon from "@mui/icons-material/People";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import { ColumnProps } from "../types/types";

export const nav = [
  {
    icon: <PeopleIcon />,
    text: "Users",
    navigatePath: "/admin/users",
  },
  {
    icon: <SettingsAccessibilityIcon />,
    text: "Roles",
    navigatePath: "/admin/roles",
  },
  {
    icon: <ProductionQuantityLimitsIcon />,
    text: "Products",
    navigatePath: "/admin/products",
  },
  {
    icon: <CategoryIcon />,
    text: "Categories",
    navigatePath: "/admin/categories",
  },
];

export const columnsUser: Array<ColumnProps> = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 175 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "role_name", label: "Role Name", minWidth: 100 },
  { id: "role_type", label: "Role Type", minWidth: 100 },
];

export const columnsRole: Array<ColumnProps> = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "role_name", label: "Role Name", minWidth: 150 },
  { id: "role_type", label: "Role Type", minWidth: 150 },
  { id: "permission", label: "Permission", minWidth: 150 },
];