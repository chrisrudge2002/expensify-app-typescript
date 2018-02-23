import IExpense from "../../interfaces/IExpense";
import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should calculate total of 0 when no expenses provided", () => {
    const result = selectExpensesTotal([]);
    expect(result).toBe(0);
});

test("should calculate total when only one expense provided", () => {
    const result = selectExpensesTotal([(expenses as IExpense[])[1]]);
    expect(result).toBe(109500);
});

test("should calculate total when multiple expenses provided", () => {
    const result = selectExpensesTotal(expenses as IExpense[]);
    expect(result).toBe(114195);
});
