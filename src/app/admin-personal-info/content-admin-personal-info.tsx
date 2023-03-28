import {useAppDispatch} from "../../hooks/redux";
import {UpdateAdminInfoDtoType} from "./types/update-admin-info-dto.type";
import {updateUserInfo} from "./store/personal-info.actions";
import SettingsForm from "./personal-info-form.component";

export default function ContentAdminPersonalInfo() {

    const dispatch = useAppDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const firstName : string = String(data.get('firstname'));
        const lastName : string = String(data.get('lastname'));
        const phone : string = String(data.get('phone'));
        const address : string = String(data.get('address'));
        const dto: UpdateAdminInfoDtoType = {firstName: firstName, lastName: lastName, phone: phone, address: address};
        console.log(dto);
        dispatch(updateUserInfo({dto}));

    }



    return (
        <SettingsForm handleSubmit={handleSubmit}/>
    );
}