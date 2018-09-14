import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import TrelloCard from "../Card/Card";
import { ICard } from "../../shared/Interfaces";
import "./Modal.css";

interface IUpdateCardModalProps {
    listId: string;
    card: ICard;
    deleteCard(): void;
    updateCard(cardName: string, cardDescription: string): void;
}

interface IUpdateCardModalState {
    modalIsOpen: boolean;
    cardName: string;
    cardDescription: string;
}

export class UpdateCardModal extends React.Component<IUpdateCardModalProps, IUpdateCardModalState> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            cardName: "",
            cardDescription: ""
        }
    }

    componentDidMount() {
        this.setState({
            cardName: this.props.card.name,
            cardDescription: this.props.card.description
        });
    };

    render() {
        const { card, deleteCard, listId } = this.props;

        return (
            <Modal className="card-update-modal"
                trigger={
                    <TrelloCard
                        listId={listId}
                        card={card}
                        deleteCard={() => deleteCard()}
                        openModal={() => this.openModal()}
                        connectDragSource={null as any}
                    />
                }
                open={this.state.modalIsOpen}
                onClose={this.closeModal}
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
                                    defaultValue={this.state.cardName} />
                            </Form.Field>
                            <Form.Field>
                                <label>Card description</label>
                                <input placeholder="Card Description"
                                    onChange={(e: any) => this.handleDescriptionInput(e.target.value)}
                                    onKeyPress={this.handleKeyPress}
                                    defaultValue={this.state.cardDescription} />
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
        this.props.updateCard(this.state.cardName, this.state.cardDescription);
        this.setState({ modalIsOpen: false });
    };

    cancel = () => {
        const card = this.props.card;

        this.setState({
            modalIsOpen: false,
            cardName: card.name,
            cardDescription: card.description
        });
    };

    handleNameInput = (input: string) => this.setState({ cardName: input });

    handleDescriptionInput = (input: string) => this.setState({ cardDescription: input });

    handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.closeModal();
        }
    };
}
