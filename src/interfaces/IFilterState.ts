import * as moment from "moment";

export default interface IFilterState {
    endDate: moment.Moment | null;
    sortBy: string;
    startDate: moment.Moment | null;
    text: string;
}
