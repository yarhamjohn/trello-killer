import * as React from "react";
import { Button, Card } from "semantic-ui-react";
import { ICard } from "./common/Interfaces";
import "../css/ToDoCard.css";

interface IToDoCardProps {
    card: ICard;
    updateCard(cardName: string, cardDescription: string): void;
    deleteCard(): void;
    openModal(): void;
}

export function ToDoCard(props: IToDoCardProps) {
    return (
        <Card onClick={props.openModal} className="todo-card" as={"div"} raised>
            <Card.Content>
                <Card.Header className="todo-card--name">
                    {props.card.name}
                </Card.Header>
                <Card.Description className="todo-card--name">
                    {props.card.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button negative onClick={props.deleteCard}>Delete</Button>
            </Card.Content>
        </Card>
    );
}
