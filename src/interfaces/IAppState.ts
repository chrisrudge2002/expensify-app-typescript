import IAuthState from "./IAuthState";
import IExpense from "./IExpense";
import IFilterState from "./IFilterState";

export default interface IAppState {
    auth: IAuthState;
    expenses: IExpense[];
    filters: IFilterState;
}
