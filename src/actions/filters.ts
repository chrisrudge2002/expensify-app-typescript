import * as moment from "moment";
import { filterActionTypes } from "./types";

export const setTextFilter = (text: string = "") => {
    return {
        text,
        type: filterActionTypes.SET_TEXT_FILTER,
    };
};

export const sortByDate = () => {
    return {
        type: filterActionTypes.SORT_BY_DATE,
    };
};

export const sortByAmount = () => {
    return {
        type: filterActionTypes.SORT_BY_AMOUNT,
    };
};

export const setStartDate = (startDate: moment.Moment | null = null) => {
    return {
        startDate,
        type: filterActionTypes.SET_START_DATE,
    };
};

export const setEndDate = (endDate: moment.Moment | null = null) => {
    return {
        endDate,
        type: filterActionTypes.SET_END_DATE,
    };
};
