import { AnyAction } from "redux";
import { authActionTypes, expenseActionTypes } from "../actions/types";

const defaultState = {
    expensesRetrieved: false,
    userid: "",
};

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case expenseActionTypes.GOT_EXPENSES:
            return {
                ...state,
                expensesRetrieved: true,
            };
        case authActionTypes.LOGGED_IN:
            return {
                ...state,
                userid: action.userid,
            };
        case authActionTypes.LOGGED_OUT:
            return {
                ...state,
                expensesRetrieved: false,
                userid: "",
            };
        default:
            return state;
    }
};
