import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "../css/NewCardModal.css";

interface INewCardModalProps {
    addCard(cardName: string, cardDescription: string): void;
}

interface INewCardModalState {
    modalOpen: boolean;
    cardName: string;
    cardDescription: string;
}

export class NewCardModal extends React.Component<INewCardModalProps, INewCardModalState> {
    public state = {
        modalOpen: false,
        cardName: "",
        cardDescription: ""
    }

    public handleOpen = () => this.setState({ modalOpen: true });

    public handleClose = () => {
        this.props.addCard(this.state.cardName, this.state.cardDescription);
        this.setState({ modalOpen: false, cardName: "", cardDescription: "" });
    };

    public handleCancel = () => {
        this.setState({ modalOpen: false });
    };

    public handleNameInput = (input: string) => {
        this.setState({ cardName: input });
    };

    public handleDescriptionInput = (input: string) => {
        this.setState({ cardDescription: input });
    };

    public handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.handleClose();
        }
    };

    public render() {
        return (
            <Modal className="card-modal"
                trigger={<Button positive fluid onClick={this.handleOpen}>Add New card</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Add a new card</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Enter card name</label>
                                <input autoFocus placeholder="card Name" onChange={(e: any) => this.handleNameInput(e.target.value)} onKeyPress={this.handleKeyPress} />
                            </Form.Field>
                            <Form.Field>
                                <label>Enter card description</label>
                                <input placeholder="card Description" onChange={(e: any) => this.handleDescriptionInput(e.target.value)} onKeyPress={this.handleKeyPress} />
                            </Form.Field>
                            <Button primary type="button" onClick={this.handleClose}>Create!</Button>
                            <Button secondary type="button" onClick={this.handleCancel}>Cancel</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
