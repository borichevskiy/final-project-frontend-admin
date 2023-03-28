import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./app/categories/store/categories.slice";
import productsReducer from "./app/products/store/products.slice";
import roleReducer from "./app/roles/store/roles.slice";
import authReducer from './app/auth/store/auth.slice';
import settingsReducer from './app/admin-personal-info/store/settings.slice';
import userSettingsReducer from './app/settings/store/settings.slice';

const rootReducer = combineReducers({
  categoryReducer,
  productsReducer,
  roleReducer,
  authReducer,
  settingsReducer,
  userSettingsReducer
});

const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}
export const store = setupStore();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
