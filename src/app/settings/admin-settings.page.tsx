import Layout from "../../components/layout.component";
import { nav } from "../constants/constants";
import ContentSettingsAdminPage from "./content-settings.component";

export default function AdminSettingsPage() {
  return (
    <Layout nav={nav} title={"Administrator"}>
      <ContentSettingsAdminPage handleSubmit={() => console.log(1)} />
    </Layout>
  );
}
