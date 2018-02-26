import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import IExpense from "../../interfaces/IExpense";
import expenses from "../fixtures/expenses";

let onCancelRemoval: jest.Mock; let startRemoveExpense: jest.Mock;
let history: { push: jest.Mock };
let wrapper: ShallowWrapper<React.Component>;

beforeEach(() => {
    history = { push: jest.fn() };
    onCancelRemoval = jest.fn();
    startRemoveExpense = jest.fn();
    wrapper = shallow(<ConfirmationModal
        id={(expenses as IExpense[])[1].id}
        description={(expenses as IExpense[])[1].description}
        isOpen={true}
        onCancelRemoval={onCancelRemoval}
        startRemoveExpense={startRemoveExpense}
        history={history}
    />);
});

test("should render ConfirmationModal correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onCancelRemoval (cancel remove expense)", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(onCancelRemoval).toHaveBeenCalled();
});

test("should handle onRemove (remove expense)", () => {
    wrapper.find("button").at(0).simulate("click");
    expect(history.push).toHaveBeenCalledWith("/");
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[1].id);
});
