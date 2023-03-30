import {useAppDispatch} from "../../hooks/redux";
import {UpdateAdminInfoDtoType} from "./types/update-admin-info-dto.type";
import {updateUserInfo} from "./store/personal-info.actions";
import PersonalInfoForm from "./personal-info-form.component";

export default function ContentAdminPersonalInfo() {
    return (
        <PersonalInfoForm />
    );
}