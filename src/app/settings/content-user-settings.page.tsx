import React from "react";
import UserForm from "./user-form";
import {useAppDispatch} from "../../hooks/redux";
import {useUserSettingsSelector} from "./store/settings.selectors";
import {UpdateUserPasswordDtoType} from "./types/update-user-password-dto.type";
import {updateUserPassword} from "./store/settings.actions";

export default function ContentUserSettingsPage() {

    const dispatch = useAppDispatch();
    const {userSettings} = useUserSettingsSelector();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const currentPassword : string = String(data.get('current_password'));
        const newPassword : string = String(data.get('new_password'));
        const confirmPassword : string = String(data.get('confirm_password'));
        const dto: UpdateUserPasswordDtoType = {password: currentPassword, newPassword: newPassword, newPasswordConfirm: confirmPassword};
        console.log(dto);
        dispatch(updateUserPassword({dto}));
        event.currentTarget.reset();
    }


    return (
        <UserForm handleSubmit={handleSubmit}/>
    );
}