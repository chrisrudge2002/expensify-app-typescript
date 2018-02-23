import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { AnyAction, Dispatch } from "redux";
import * as expenseActions from "../actions/expenses";
import IAppState from "../interfaces/IAppState";
import IExpense from "../interfaces/IExpense";
import ExpenseForm from "./ExpenseForm";

interface IEditExpensePageProps extends RouteComponentProps<any> {
    expense: IExpense;
    history: any;
    startEditExpense: (id: string, updates: {} ) => AnyAction;
    startRemoveExpense: (id: string) => AnyAction;
}

export class EditExpensePage extends React.Component<IEditExpensePageProps> {
    public render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm expense={this.props.expense} onFormSubmit={this.onSubmit} />
                    <button
                        className="button button--secondary"
                        onClick={this.onRemove}>
                            Remove Expense
                    </button>
                </div>
            </div>
        );
    }
    private onSubmit = (expense: IExpense) => {
        if (this.props.expense.id) {
            this.props.startEditExpense(this.props.expense.id, expense);
            this.props.history.push("/");
        }
    }
    private onRemove = () => {
        if (this.props.expense.id) {
            this.props.startRemoveExpense(this.props.expense.id);
            this.props.history.push("/");
        }
    }
}

const mapStateToProps = (state: IAppState, props: IEditExpensePageProps) => ({
    expense: state.expenses.find((e: IExpense) => e.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    startEditExpense: (id: string, expense: IExpense) =>
        (dispatch(expenseActions.startEditExpense(id, expense)) as AnyAction),
    startRemoveExpense: (id: string) => (dispatch(expenseActions.startRemoveExpense(id)) as AnyAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
