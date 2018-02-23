import * as moment from "moment";
import { AnyAction } from "redux";
import { filterActionTypes } from "../actions/types";
import IFilterState from "../interfaces/IFilterState";

const defaultState = {
    endDate: moment().endOf("month"),
    sortBy: "date", // date or amount
    startDate: moment().startOf("month"),
    text: "",
};

export default (state: IFilterState = defaultState, action: AnyAction) => {
    switch (action.type) {
        case filterActionTypes.SET_TEXT_FILTER:
            return {
                ...state,
                text: action.text,
            };
        case filterActionTypes.SORT_BY_DATE:
            return {
                ...state,
                sortBy: "date",
            };
        case filterActionTypes.SORT_BY_AMOUNT:
            return {
                ...state,
                sortBy: "amount",
            };
        case filterActionTypes.SET_START_DATE:
            return {
                ...state,
                startDate: action.startDate,
            };
        case filterActionTypes.SET_END_DATE:
            return {
                ...state,
                endDate: action.endDate,
            };
        default:
            return state;
    }
};
