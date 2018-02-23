import moment from "../__mocks__/mock-moment";

const filters = {
    endDate: null,
    sortBy: "date",
    startDate: null,
    text: "",
};

const altFilters = {
    endDate: moment(0).add(3, "days"),
    sortBy: "amount",
    startDate: moment(0),
    text: "bill",
};

export { filters, altFilters };
