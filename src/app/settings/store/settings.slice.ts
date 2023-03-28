import {createSlice} from "@reduxjs/toolkit";
import {UserSettingsStateType} from "../types/user-settings-state.type";
import {updateUserPassword} from "./settings.actions";

const initialState: UserSettingsStateType = {
    userSettings: null,
    pending: {
        userSettings: false,
    },
    errors: {
        userSettings: null
    }
}

const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserPassword.pending, (state) => {
                state.pending.userSettings = true;
                state.errors.userSettings = null;
            })
            .addCase(updateUserPassword.fulfilled, (state, { payload }) => {
                state.pending.userSettings = false;
                state.userSettings = payload;
            })
            .addCase(updateUserPassword.rejected, (state, action: any & { payload: any }) => {
                state.pending.userSettings = false;
                state.errors.userSettings = action.payload.message;
            })
    }
});

export default userSettingsSlice.reducer;