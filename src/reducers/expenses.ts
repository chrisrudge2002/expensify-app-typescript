import { AnyAction } from "redux";
import { authActionTypes, expenseActionTypes } from "../actions/types";
import IExpense from "../interfaces/IExpense";

const defaultState: IExpense[] = [];

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case expenseActionTypes.ADD_EXPENSE:
            return [
                ...state,
                action.expense,
            ];
        case expenseActionTypes.EDIT_EXPENSE:
            return state.map((e) => {
                if (e.id === action.id) {
                    return {
                        ...e,
                        ...action.updates,
                    };
                }
                return e;
            });
        case expenseActionTypes.GOT_EXPENSES:
            return action.expenseList;
        case authActionTypes.LOGGED_OUT:
            return [];
        case expenseActionTypes.REMOVE_EXPENSE:
            return state.filter((e) => e.id !== action.id);
        default:
            return state;
    }
};
