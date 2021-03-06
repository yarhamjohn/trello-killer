import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "./Modal.css";

interface IAddCardModalProps {
    addCard(cardName: string, cardDescription: string): void;
}

interface IAddCardModalState {
    modalIsOpen: boolean;
    cardName: string;
    cardDescription: string;
}

export class AddCardModal extends React.Component<IAddCardModalProps, IAddCardModalState> {
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
                   trigger={<Button positive fluid onClick={this.openModal} className="new-card--button">Add new card</Button>}
                   open={this.state.modalIsOpen}
                   onClose={this.closeModal}
            >
                <Modal.Header>Add a new card</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Card name</label>
                                <input autoFocus placeholder="Card name" onChange={(e: any) => this.handleNameInput(e.target.value)} onKeyPress={this.handleKeyPress} />
                            </Form.Field>
                            <Form.Field>
                                <label>Card description</label>
                                <input placeholder="Card description" onChange={(e: any) => this.handleDescriptionInput(e.target.value)} onKeyPress={this.handleKeyPress} />
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
