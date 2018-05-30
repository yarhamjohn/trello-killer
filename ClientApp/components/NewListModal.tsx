import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "../css/NewListModal.css";

interface INewListModalProps {
    addList(listName : string): void;
}

interface INewListModalState {
    modalIsOpen: boolean;
    listName: string;
}

export class NewListModal extends React.Component<INewListModalProps, INewListModalState> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            listName: ""
        }
    }

    render() {
        return (
            <Modal className="list-modal"
                   trigger={<Button positive fluid onClick={this.openModal}>Add New List</Button>}
                   open={this.state.modalIsOpen}
                   onClose={this.closeModal}
            >
                <Modal.Header>Add a new list</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Enter list name</label>
                                <input autoFocus placeholder="List Name" onChange={(e: any) => this.handleInput(e.target.value)} onKeyPress={this.handleKeyPress} />
                            </Form.Field>
                            <Button primary type="button" onClick={this.closeModal}>Create!</Button>
                            <Button secondary type="button" onClick={this.cancel}>Cancel</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }

    openModal = () => this.setState({ modalIsOpen: true });

    closeModal = () => {
        this.props.addList(this.state.listName);
        this.setState({ modalIsOpen: false, listName: "" });
    };

    cancel = () => this.setState({ modalIsOpen: false });

    handleInput = (input: string) => this.setState({ listName: input });

    handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.closeModal();
        }
    };
}
