import PeopleIcon from "@mui/icons-material/People";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import { Column, NavParams } from "../types/props.type";

export const nav: NavParams[] = [
  {
    icon: <PeopleIcon />,
    text: "Users",
    navigatePath: "/app/admin/users",
  },
  {
    icon: <SettingsAccessibilityIcon />,
    text: "Roles",
    navigatePath: "/app/admin/roles",
  },
  {
    icon: <ProductionQuantityLimitsIcon />,
    text: "Products",
    navigatePath: "/app/admin/products",
  },
  {
    icon: <CategoryIcon />,
    text: "Categories",
    navigatePath: "/app/admin/categories",
  },
  {
    icon: <SettingsIcon />,
    text: "Settings",
    navigatePath: "/app/admin/settings",
  },
];

export const columnsUser: Array<Column> = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 175 },
  { id: "status", label: "Status", minWidth: 100 },
  { id: "role_name", label: "Role Name", minWidth: 100 },
  { id: "role_type", label: "Role Type", minWidth: 100 },
];

export const columnsRole: Array<Column> = [
  { id: "name", label: "Role Name", minWidth: 150 },
  { id: "type", label: "Role Type", minWidth: 150 },
  { id: "permissions", label: "Permissions", minWidth: 150 },
];

export const columnsCategories: Array<Column> = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "description", label: "Description", minWidth: 100 },
];