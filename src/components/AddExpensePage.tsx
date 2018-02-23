import * as React from "react";
import { connect } from "react-redux";
import { RouterProps } from "react-router";
import { AnyAction, Dispatch } from "redux";
import * as expenseActions from "../actions/expenses";
import IExpense from "../interfaces/IExpense";
import ExpenseForm from "./ExpenseForm";

interface IAddExpensePageProps extends RouterProps {
    startAddExpense: (expense: IExpense) => AnyAction;
}

export class AddExpensePage extends React.Component<IAddExpensePageProps> {
    public render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm onFormSubmit={this.onSubmit} />
                </div>
            </div>
        );
    }
    private onSubmit = (expense: IExpense) => {
        this.props.startAddExpense(expense);
        this.props.history.push("/");
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    startAddExpense: (expense: IExpense) => (dispatch(expenseActions.startAddExpense(expense)) as AnyAction),
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
