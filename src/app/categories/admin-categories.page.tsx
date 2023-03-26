import Layout from "../../components/layout.component";
import { nav } from "../constants/constants";
import ContentAdminCategoriesPage from "./content-categories.component";

export default function AdminProductsPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminCategoriesPage />
    </Layout>
  );
}
