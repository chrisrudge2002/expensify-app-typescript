import * as moment from "moment";
import * as React from "react";
import { SingleDatePicker } from "react-dates";
import IExpense from "../interfaces/IExpense";

interface IExpenseFormProps extends React.Props<ExpenseForm> {
    expense?: IExpense | undefined;
    onFormSubmit?: (expense: IExpense) => void;
}

interface IExpenseFormState {
    amount: string;
    calendarFocused: boolean;
    createdAt: moment.Moment;
    description: string;
    error: string;
    note: string;
}

class ExpenseForm extends React.Component<IExpenseFormProps, IExpenseFormState> {
    constructor(props: IExpenseFormProps) {
        super(props);

        this.state = {
            amount: props.expense ? (props.expense.amount / 100).toString() : "",
            calendarFocused: false,
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            description: props.expense ? props.expense.description : "",
            error: "",
            note: props.expense ? props.expense.note : "",
        };
    }
    public render() {
        return (
            <form className="form" onSubmit={this.onFormSubmission}>
                { this.state.error && <p className="form__error">{this.state.error}</p> }
                <input
                    className="text-input"
                    type="text"
                    placeholder="Description"
                    autoFocus={true}
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <input
                    className="text-input"
                    type="text"
                    placeholder="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onCalendarFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    displayFormat="DD MMM YYYY"
                    id="d"
                />
                <textarea
                    className="textarea"
                    placeholder="Add a note for your expense (optional)"
                    value={this.state.note}
                    onChange={this.onNoteChange}>
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        );
    }
    private onAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
        const amount = e.currentTarget.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }
    private onCalendarFocusChange = ({ focused }: { focused: boolean | null }) => {
        this.setState(() => ({ calendarFocused: focused ? focused : false }));
    }
    private onDateChange = (createdAt: moment.Moment | null) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }
    private onDescriptionChange = (e: React.FormEvent<HTMLInputElement>) => {
        const description = e.currentTarget.value;
        this.setState(() => ({ description }));
    }
    private onNoteChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const note = e.currentTarget.value;
        this.setState(() => ({ note }));
    }
    private onFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!this.state.description || !this.state.amount) {
            this.setState(() => ({ error: "Please provide description and amount."}));
        } else {
            this.setState(() => ({ error: "" }));
            if (this.props.onFormSubmit) {
                this.props.onFormSubmit({
                    amount: parseFloat(this.state.amount) * 100,
                    createdAt: this.state.createdAt.valueOf(),
                    description: this.state.description,
                    note: this.state.note,
                });
            }
        }
    }
}

export default ExpenseForm;
