import * as React from "react";
import { Button, Card } from "semantic-ui-react";
import "../css/ToDoCard.css";

interface IToDoCardProps {
    cardName: string;
    updateCard(cardName: string): void;
}

interface IToDoCardState {
    newCardName: string;
}
export class ToDoCard extends React.Component<IToDoCardProps, IToDoCardState> {

    public constructor() {
        super();
        this.state = {
            newCardName: ""
        }
    }

    public changeCardName = (input: string) => {
        this.setState({ newCardName: input });
    };

    public changeCardNameOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    public changeCardNameOnOutsideClick = () => {
        this.props.updateCard(this.state.newCardName);
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
                            onKeyPress={this.changeCardNameOnKeyPress}
                            onBlur={this.changeCardNameOnOutsideClick} />
                    </Card.Header>
                    <Card.Description>
                        I am a card
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button size="small" positive>Edit</Button>
                    <Button size="small" negative>Delete</Button>
                </Card.Content>
            </Card>
        );
    }
}
