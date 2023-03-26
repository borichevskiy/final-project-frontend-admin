import Layout from "../../components/layout.component";

import { nav } from "../constants/constants";
import ContentAdminUsersPage from "./content-users.component";

export default function AdminUsersPage () {
  return(
    <Layout nav={nav} title={'Administrator'}> 
      <ContentAdminUsersPage/>
    </Layout>
  );
} 