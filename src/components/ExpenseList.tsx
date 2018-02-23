import * as React from "react";
import { connect } from "react-redux";
import IAppState from "../interfaces/IAppState";
import IExpense from "../interfaces/IExpense";
import selectExpenses from "../selectors/expenses";
import ExpenseListItem from "./ExpenseListItem";

interface IExpenseListProps {
    expenses: IExpense[];
}

export const ExpenseList: React.SFC<IExpenseListProps> = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No expenses</span>
                    </div>
                ) : (
                    props.expenses.map((e: IExpense) => (<ExpenseListItem key={e.id} {...e} />))
                )
            }
        </div>
    </div>
);

const mapStateToProps = (state: IAppState) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
    };
};

export default connect(mapStateToProps)(ExpenseList);
