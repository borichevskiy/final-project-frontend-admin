import Layout from "../../components/layout.component";
import { nav } from "../constants/constants";
import ContentSettingsAdminPage from "./personal-info-form.component";
import ContentAdminSettings from "./content-admin-settings";

export default function AdminPersonalInfoPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminSettings/>
    </Layout>
  );
}
