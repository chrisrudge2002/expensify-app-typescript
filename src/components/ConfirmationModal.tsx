import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import * as Modal from "react-modal";
import * as expenseActions from "../actions/expenses";

interface IConfirmationModalProps {
    description: string;
    id: string | undefined;
    isOpen: boolean;
    history: any;
    onCancelRemoval: () => void;
    startRemoveExpense: (id: string) => AnyAction;
}

export class ConfirmationModal extends React.Component<IConfirmationModalProps> {
    public render() {
        return (
            <Modal
                isOpen={!!this.props.isOpen}
                onRequestClose={this.props.onCancelRemoval}
                contentLabel="Confirm Removal"
                closeTimeoutMS={200}
                className="modal"
            >
            <h3 className="modal__title">Remove Expense</h3>
            <p className="modal__body">{`Are you sure you want to remove the expense '${this.props.description}'?`}</p>
            <button className="button button--confirm-yes" onClick={this.onConfirmRemoval}>Yes</button>
            <button className="button button--confirm-no" onClick={this.props.onCancelRemoval}>No</button>
          </Modal>
        );
    }
    private onConfirmRemoval = () => {
        if (this.props.id && this.props.startRemoveExpense) {
            this.props.startRemoveExpense(this.props.id);
            this.props.history.push("/");
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    startRemoveExpense: (id: string) => (dispatch(expenseActions.startRemoveExpense(id)) as AnyAction),
});

export default connect(undefined, mapDispatchToProps)(ConfirmationModal);