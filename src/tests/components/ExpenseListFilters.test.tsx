import { shallow, ShallowWrapper } from "enzyme";
import moment from "../__mocks__/mock-moment";
import * as React from "react";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import IFilterState from "../../interfaces/IFilterState";
import { altFilters, filters } from "../fixtures/filters";

let setTextFilter: jest.Mock; let sortByAmount: jest.Mock; let sortByDate: jest.Mock;
let setStartDate: jest.Mock; let setEndDate: jest.Mock;
let wrapper: ShallowWrapper<React.Component>;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(<ExpenseListFilters
                         filters={filters as IFilterState}
                         setTextFilter={setTextFilter}
                         sortByAmount={sortByAmount}
                         sortByDate={sortByDate}
                         setStartDate={setStartDate}
                         setEndDate={setEndDate} />);
});

test("should render ExpenseListFilters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
    wrapper.setProps<any>({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
    const value = "rent";
    wrapper.find("input").simulate("change", {
        currentTarget: { value },
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by amount", () => {
    const value = "amount";
    wrapper.find("select").simulate("change", {
        currentTarget: { value },
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test("should sort by date", () => {
    wrapper.setProps<any>({ filters: altFilters });
    const value = "date";
    wrapper.find("select").simulate("change", {
        currentTarget: { value },
    });
    expect(sortByDate).toHaveBeenCalled();
});

test("should handle date changes", () => {
    const startDate = moment(0).add(4, "years");
    const endDate = moment(0).add(8, "years");
    const fn: ({ startDate, endDate }: { startDate: any | null, endDate: any | null }) => void =
        wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange");
    fn({ startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handle date focus changes", () => {
    const calendarFocused = "endDate";
    const fn: (calendarFocused: "startDate" | "endDate" | null) => void =
        wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange");
    fn(calendarFocused);
    expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
