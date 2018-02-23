import IExpense from "../interfaces/IExpense";

export default (expenses: IExpense[]) => (expenses.reduce((total, exp) => total + exp.amount, 0));
