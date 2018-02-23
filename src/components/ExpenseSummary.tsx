import * as numeral from "numeral";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import IAppState from "../interfaces/IAppState";
import selectExpenses from "../selectors/expenses";
import selectExpensesTotal from "../selectors/expenses-total";

interface IExpenseSummaryProps {
    expenseCount: number;
    totalAmount: number;
}

export const ExpenseSummary: React.SFC<IExpenseSummaryProps> = ({ expenseCount, totalAmount }) => {
    const expenseWord = expenseCount === 1 ? "expense" : "expenses";
    const formattedTotal = numeral(totalAmount / 100).format("$0,0.00");
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-hesder__title">
                    Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedTotal}</span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IAppState) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        totalAmount: selectExpensesTotal(visibleExpenses),
    };
};

export default connect(mapStateToProps)(ExpenseSummary);
