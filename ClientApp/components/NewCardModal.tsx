import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "../css/NewCardModal.css";

interface INewCardModalProps {
    addCard(cardName: string, cardDescription: string): void;
}

interface INewCardModalState {
    modalIsOpen: boolean;
    cardName: string;
    cardDescription: string;
}

export class NewCardModal extends React.Component<INewCardModalProps, INewCardModalState> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            cardName: "",
            cardDescription: ""
        }
    }

    render() {
        return (
            <Modal className="card-modal"
                   trigger={<Button positive fluid onClick={this.openModal} className="new-card--button">Add New card</Button>}
                   open={this.state.modalIsOpen}
                   onClose={this.closeModal}
            >
                <Modal.Header>Add a new card</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Card name</label>
                                <input autoFocus placeholder="card Name" onChange={(e: any) => this.handleNameInput(e.target.value)} onKeyPress={this.handleKeyPress} />
                            </Form.Field>
                            <Form.Field>
                                <label>Card description</label>
                                <input placeholder="card Description" onChange={(e: any) => this.handleDescriptionInput(e.target.value)} onKeyPress={this.handleKeyPress} />
                            </Form.Field>
                            <Button primary type="button" onClick={this.closeModal}>Ok!</Button>
                            <Button secondary type="button" onClick={this.cancel}>Cancel</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    };

    openModal = () => this.setState({ modalIsOpen: true });

    closeModal = () => {
        this.props.addCard(this.state.cardName, this.state.cardDescription);
        this.setState({ modalIsOpen: false, cardName: "", cardDescription: "" });
    };

    cancel = () => this.setState({ modalIsOpen: false });

    handleNameInput = (input: string) => this.setState({ cardName: input });

    handleDescriptionInput = (input: string) => this.setState({ cardDescription: input });

    handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.closeModal();
        }
    };
}
