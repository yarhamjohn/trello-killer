import * as React from "react";
import { Button, Modal, Form } from "semantic-ui-react"
import "../css/ListModal.css";

interface IListModalProps {
    addList(listName : string): void;
}

export class ListModal extends React.Component<IListModalProps, {}> {
    public state = {
        modalOpen: false,
        listName: "",
    }

    public handleOpen = () => this.setState({ modalOpen: true });

    public handleClose = () => {
        this.setState({ modalOpen: false });
        this.props.addList(this.state.listName);
    };

    public handleInput = (input: string) => {
        this.setState({ listName: input });
    };

    public render() {
        return (
            <Modal className="list-modal"
                trigger={<Button positive fluid onClick={this.handleOpen}>Add New List</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
            >
                <Modal.Header>Add a new list</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Enter list name</label>
                                <input placeholder="List Name" onChange={(e: any) => this.handleInput(e.target.value)}/>
                            </Form.Field>
                            <Button type="button" onClick={this.handleClose}>Create!</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}
