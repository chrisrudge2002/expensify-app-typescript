import { Moment } from "moment";
import * as React from "react";
import { DateRangePicker } from "react-dates";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import * as filterActions from "../actions/filters";
import IAppState from "../interfaces/IAppState";
import IFilterState from "../interfaces/IFilterState";

interface IExpenseListFiltersProps extends React.Props<ExpenseListFilters> {
    filters: IFilterState;
    setEndDate: (endDate: Moment | null) => AnyAction;
    setStartDate: (startDate: Moment | null) => AnyAction;
    setTextFilter: (text: string) => AnyAction;
    sortByAmount: () => AnyAction;
    sortByDate: () => AnyAction;
}

interface IExpenseListFiltersState {
    calendarFocused: "startDate" | "endDate" | null;
}

export class ExpenseListFilters extends React.Component<IExpenseListFiltersProps, IExpenseListFiltersState> {
    public state = {
        calendarFocused: null,
    };
    public render() {
        return (
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input
                            className="text-input"
                            type="text"
                            value={this.props.filters.text}
                            onChange={this.onTextChange} placeholder="Search expenses"
                        />
                    </div>
                    <div className="input-group__item">
                        <select
                            className="select"
                            value={this.props.filters.sortBy}
                            onChange={this.onSortChange}>
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            startDateId="startDateId"
                            endDate={this.props.filters.endDate}
                            endDateId="endDateId"
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onCalendarFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                            displayFormat="DD MMM YYYY"
                            showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
    private onCalendarFocusChange = (calendarFocused: "startDate" | "endDate" | null) => {
        this.setState(() => ({ calendarFocused }));
    }
    private onDatesChange = ({ startDate, endDate }: { startDate: Moment | null, endDate: Moment | null }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    }
    private onSortChange = (e: React.FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value === "date") {
            this.props.sortByDate();
        } else if (e.currentTarget.value === "amount") {
            this.props.sortByAmount();
        }
    }
    private onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.props.setTextFilter(e.currentTarget.value);
    }
}

const mapStateToProps = (state: IAppState) => ({
    filters: state.filters,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    setEndDate: (endDate: Moment | null) => (dispatch(filterActions.setEndDate(endDate)) as AnyAction),
    setStartDate: (startDate: Moment | null) => (dispatch(filterActions.setStartDate(startDate)) as AnyAction),
    setTextFilter: (text: string) => (dispatch(filterActions.setTextFilter(text)) as AnyAction),
    sortByAmount: () => dispatch(filterActions.sortByAmount()),
    sortByDate: () => dispatch(filterActions.sortByDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
