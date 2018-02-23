import * as moment from "moment";
import * as filterActions from "../../actions/filters";
import { filterActionTypes } from "../../actions/types";

test("should generate set end date action", () => {
    const action = filterActions.setEndDate(moment(0));
    expect(action).toEqual({
        endDate: moment(0),
        type: filterActionTypes.SET_END_DATE,
    });
});

test("should generate set start date action", () => {
    const action = filterActions.setStartDate(moment(0));
    expect(action).toEqual({
        startDate: moment(0),
        type: filterActionTypes.SET_START_DATE,
    });
});

test("should generate set text filter action with provided value", () => {
    const text = "Something in";
    const action = filterActions.setTextFilter(text);
    expect(action).toEqual({
        text,
        type: filterActionTypes.SET_TEXT_FILTER,
    });
});

test("should generate set text filter action with default value", () => {
    const action = filterActions.setTextFilter();
    expect(action).toEqual({
        text: "",
        type: filterActionTypes.SET_TEXT_FILTER,
    });
});

test("should generate sort by amount action", () => {
    const action = filterActions.sortByAmount();
    expect(action).toEqual({
        type: filterActionTypes.SORT_BY_AMOUNT,
    });
});

test("should generate sort by date action", () => {
    const action = filterActions.sortByDate();
    expect(action).toEqual({
        type: filterActionTypes.SORT_BY_DATE,
    });
});
