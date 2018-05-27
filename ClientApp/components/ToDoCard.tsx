import * as React from "react";
import { Button, Card } from "semantic-ui-react";
import "../css/ToDoCard.css";

interface IToDoCardProps {
    cardName: string;
    cardDescription: string;
    updateCard(cardName: string, cardDescription: string): void;
    deleteCard(): void;
}

interface IToDoCardState {
    newCardName: string;
    newCardDescription: string;
}
export class ToDoCard extends React.Component<IToDoCardProps, IToDoCardState> {

    public constructor() {
        super();
        this.state = {
            newCardName: "",
            newCardDescription: ""
        }
    }

    public changeCardName = (input: string) => {
        this.setState({ newCardName: input });
    };

    public changeCardDescription = (input: string) => {
        this.setState({ newCardDescription: input });
    };

    public updateCardOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    public updateCardOnOutsideClick = () => {
        this.props.updateCard(this.state.newCardName, this.state.newCardDescription);
    };

    public render() {
        return (
            <Card className="todo-card" as={"div"} raised>
                <Card.Content>
                    <Card.Header>
                        <textarea
                            className="card-name"
                            defaultValue={this.props.cardName}
                            onChange={(event: any) => this.changeCardName(event.target.value)}
                            onKeyPress={this.updateCardOnKeyPress}
                            onBlur={this.updateCardOnOutsideClick} />
                    </Card.Header>
                    <Card.Description>
                        <textarea
                            className="card-name"
                            defaultValue={this.props.cardDescription}
                            onChange={(event: any) => this.changeCardDescription(event.target.value)}
                            onKeyPress={this.updateCardOnKeyPress}
                            onBlur={this.updateCardOnOutsideClick} />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button size="small" negative onClick={this.props.deleteCard}>Delete</Button>
                </Card.Content>
            </Card>
        );
    }
}
