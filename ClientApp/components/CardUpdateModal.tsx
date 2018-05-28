import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "../css/CardUpdateModal.css";
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

export class CardUpdateModal extends React.Component<ICardModalProps, ICardModalState> {
    constructor() {
        super();
        this.state = {
            modalOpen: false,
            currentCardName: "",
            currentCardDescription: ""
        }
    }

    public render() {
        return (
            <Modal className="card-update-modal"
                trigger={
                    <ToDoCard
                        cardName={this.props.cardName}
                        cardDescription={this.props.cardDescription}
                        deleteCard={() => this.props.deleteCard()}
                        updateCard={(newCardName, newCardDescription) => { this.props.updateCard(newCardName, newCardDescription) }}
                        openCardUpdateModal={() => this.openCardUpdateModal()}
                    />
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Update card</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Card name</label>
                                <input autoFocus
                                    placeholder="Card Name"
                                    onChange={(e: any) => this.handleNameInput(e.target.value)}
                                    onKeyPress={this.handleKeyPress}
                                    defaultValue={this.props.cardName} />
                            </Form.Field>
                            <Form.Field>
                                <label>Card description</label>
                                <input placeholder="Card Description"
                                    onChange={(e: any) => this.handleDescriptionInput(e.target.value)}
                                    onKeyPress={this.handleKeyPress}
                                    defaultValue={this.props.cardDescription} />
                            </Form.Field>
                            <Button primary type="button" onClick={this.handleClose}>Ok!</Button>
                            <Button secondary type="button" onClick={this.handleCancel}>Cancel</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    };

    public componentDidMount() {
        this.initialiseCardModal();
    };

    public initialiseCardModal = () => {
        this.setState({
            modalOpen: false,
            currentCardName: this.props.cardName,
            currentCardDescription: this.props.cardDescription,
        });
    };

    public openCardUpdateModal = () => this.setState({ modalOpen: true });

    public handleClose = () => {
        this.props.updateCard(this.state.currentCardName, this.state.currentCardDescription);
        this.setState({ modalOpen: false });
    };

    public handleCancel = () => this.initialiseCardModal();

    public handleNameInput = (input: string) => this.setState({ currentCardName: input });

    public handleDescriptionInput = (input: string) => this.setState({ currentCardDescription: input });

    public handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.handleClose();
        }
    };
}
