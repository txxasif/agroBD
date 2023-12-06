"use client"
import { persistStoreS, store } from "@/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistStoreS}>
                {
                    children
                }
            </PersistGate>
        </Provider>
    );
}
