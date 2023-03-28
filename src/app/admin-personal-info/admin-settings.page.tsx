import Layout from "../../components/layout.component";
import { nav } from "../constants/constants";
import ContentSettingsAdminPage from "./settings-form.component";
import ContentAdminSettings from "./content-admin-settings";

export default function AdminSettingsPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminSettings/>
    </Layout>
  );
}
