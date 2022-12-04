import React, { createContext } from "react";
import { AppStateType, getAppState } from "./state";


export default createContext<{
    state: AppStateType,
    dispatch: React.Dispatch<any>;
}>({
    state: getAppState(),
    dispatch: () => null
});