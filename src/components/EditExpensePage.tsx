import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { AnyAction, Dispatch } from "redux";
import * as expenseActions from "../actions/expenses";
import IAppState from "../interfaces/IAppState";
import IExpense from "../interfaces/IExpense";
import ExpenseForm from "./ExpenseForm";
import ConfirmationModal from "./ConfirmationModal";

interface IEditExpensePageProps extends RouteComponentProps<any> {
    expense: IExpense;
    startEditExpense: (id: string, updates: {} ) => AnyAction;
}

interface IEditExpensePageState {
    confirmModalIsOpen: boolean;
}

export class EditExpensePage extends React.Component<IEditExpensePageProps, IEditExpensePageState> {
    constructor(props: IEditExpensePageProps) {
        super(props);

        this.state = {
            confirmModalIsOpen: false,
        };
    }
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
                <ConfirmationModal 
                    id={this.props.expense.id}
                    description={this.props.expense.description}
                    isOpen={this.state.confirmModalIsOpen}
                    onCancelRemoval={this.onCancelRemoval}
                    history={this.props.history} />
            </div>
        );
    }
    private onCancelRemoval = () => {
        this.setState(() => ({ confirmModalIsOpen: false }));
    }
    private onSubmit = (expense: IExpense) => {
        if (this.props.expense.id) {
            this.props.startEditExpense(this.props.expense.id, expense);
            this.props.history.push("/");
        }
    }
    private onRemove = () => {
        if (this.props.expense.id) {
            this.setState(() => ({ confirmModalIsOpen: true }));
        }
    }
}

const mapStateToProps = (state: IAppState, props: IEditExpensePageProps) => ({
    expense: state.expenses.find((e: IExpense) => e.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    startEditExpense: (id: string, expense: IExpense) =>
        (dispatch(expenseActions.startEditExpense(id, expense)) as AnyAction),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
