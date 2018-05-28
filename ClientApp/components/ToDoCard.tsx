import * as React from "react";
import { Button, Card } from "semantic-ui-react";
import "../css/ToDoCard.css";

interface IToDoCardProps {
    cardName: string;
    cardDescription: string;
    updateCard(cardName: string, cardDescription: string): void;
    deleteCard(): void;
    handleOpen(): void;
}

export const ToDoCard = (props: IToDoCardProps) => {
    return (
        <Card onClick={props.handleOpen} className="todo-card" as={"div"} raised>
            <Card.Content>
                <Card.Header className="card-name">
                    {props.cardName}
                </Card.Header>
                <Card.Description className="card-name">
                    {props.cardDescription}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button negative onClick={props.deleteCard}>Delete</Button>
            </Card.Content>
        </Card>
    );
}
