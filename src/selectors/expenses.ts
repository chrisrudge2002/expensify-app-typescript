import * as moment from "moment";
import IExpense from "../interfaces/IExpense";
import IFilterState from "../interfaces/IFilterState";

export default (expenses: IExpense[], { text, sortBy, startDate, endDate }: IFilterState) => {
    return expenses.filter((e: IExpense) => {
        const createdAtMoment = moment(e.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, "day") : true;
        const textMatch = (!text || e.description.toLowerCase().includes(text.toLowerCase()));

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a: IExpense, b: IExpense) => {
        if (sortBy === "amount") {
            return (a.amount < b.amount ? 1 : -1);
        }

        return (a.createdAt < b.createdAt ? 1 : -1);
    });
};
