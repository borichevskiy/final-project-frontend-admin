import Layout from "../../components/layout.component";
import { nav } from "../constants/constants";
import ContentSettingsAdminPage from "./personal-info-form.component";
import ContentAdminPersonalInfo from "./content-admin-personal-info";

export default function AdminPersonalInfoPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentAdminPersonalInfo/>
    </Layout>
  );
}
