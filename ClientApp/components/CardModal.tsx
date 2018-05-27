import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "../css/CardModal.css";
import { ToDoCard } from "./ToDoCard";

interface ICardModalProps {
    cardName: string;
    cardDescription: string;
    deleteCard(): void;
    updateCard(cardName: string, cardDescription: string): void;
}

interface ICardModalState {
    modalOpen: boolean;
    currentCardName: string;
    currentCardDescription: string;
}

export class CardModal extends React.Component<ICardModalProps, ICardModalState> {
    public state = {
        modalOpen: false,
        currentCardName: "",
        currentCardDescription: ""
    }

    public handleOpen = () => this.setState({ modalOpen: true });

    public handleClose = () => {
        this.props.updateCard(this.state.currentCardName, this.state.currentCardDescription);
        this.setState({ modalOpen: false, currentCardName: "", currentCardDescription: "" });
    };

    public handleCancel = () => {
        this.setState({ modalOpen: false });
    };

    public handleNameInput = (input: string) => {
        this.setState({ currentCardName: input });
    };

    public handleDescriptionInput = (input: string) => {
        this.setState({ currentCardDescription: input });
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
                trigger={
                    <ToDoCard
                        cardName={this.props.cardName}
                        cardDescription={this.props.cardDescription}
                        deleteCard={() => this.props.deleteCard()}
                        updateCard={(newCardName, newCardDescription) => { this.props.updateCard(newCardName, newCardDescription) }}
                        handleOpen={() => this.handleOpen()}
                    />
                }
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
