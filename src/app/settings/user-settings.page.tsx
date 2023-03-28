import Layout from "../../components/layout.component";
import ContentUserSettingsPage from "./content-user-settings.page";
import {nav} from "../constants/constants";

export default function UserSettingsPage () {
    return(
        <Layout nav={nav} title={'Settings'}>
            <ContentUserSettingsPage/>
        </Layout>
    );
}