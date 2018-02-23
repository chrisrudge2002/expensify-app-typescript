import moment from "../__mocks__/mock-moment";

export default [{
    amount: 195,
    createdAt: 0,
    description: "Gum",
    id: "1",
    note: "",
}, {
    amount: 109500,
    createdAt: moment(0).subtract(4, "days").valueOf(),
    description: "Rent",
    id: "2",
}, {
    amount: 4500,
    createdAt: moment(0).add(4, "days").valueOf(),
    description: "Credit Card",
    id: "3",
}];
