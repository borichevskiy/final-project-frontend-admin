import {createAsyncThunk} from "@reduxjs/toolkit";
import repository from "../../../repository";
import {UpdateUserPasswordDtoType} from "../types/update-user-password-dto.type";

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const updateUserPassword = createAsyncThunk<UpdateUserPasswordDtoType, {dto: UpdateUserPasswordDtoType}>(
    'user/settings/update',
    async ({dto}, thunkAPI) => {
        try{
            const response = await repository.put('/users',dto, headers);
            return response.data;

        }   catch (e) {
            return  thunkAPI.rejectWithValue('Can`t update user password');
        }
    }
);
