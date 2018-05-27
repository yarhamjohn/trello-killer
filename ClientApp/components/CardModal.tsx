import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "../css/cardModal.css";

interface ICardModalProps {
    addCard(cardName: string): void;
}

export class CardModal extends React.Component<ICardModalProps, {}> {
    public state = {
        modalOpen: false,
        cardName: "",
    }

    public handleOpen = () => this.setState({ modalOpen: true });

    public handleClose = () => {
        this.props.addCard(this.state.cardName);
        this.setState({ modalOpen: false, cardName: "" });
    };

    public handleCancel = () => {
        this.setState({ modalOpen: false });
    };

    public handleInput = (input: string) => {
        this.setState({ cardName: input });
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
                                <input autoFocus placeholder="card Name" onChange={(e: any) => this.handleInput(e.target.value)} onKeyPress={this.handleKeyPress} />
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
