import React, { createContext, Dispatch, ReducerAction, ReducerState } from "react";
import { Action } from "./action";
import { AppStateType, initialAppState } from "./state";


export default createContext<{
    state: AppStateType,
    dispatch: React.Dispatch<any>;
}>({
    state: initialAppState,
    dispatch: () => null
});