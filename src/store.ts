import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categoryReducer from './app/admin/categories/store/categories.slice';
import productsReducer from "./app/admin/products/store/products.slice";
import roleReducer from "./app/admin/roles/store/roles.slice";

const rootReducer = combineReducers({
  categoryReducer,
  productsReducer,
  roleReducer,
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
