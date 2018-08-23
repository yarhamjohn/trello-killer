import * as React from "react";
import { Button, Card } from "semantic-ui-react";
import { ICard } from "../Common/Interfaces";
import "./Card.css";

interface ITrelloCardProps {
    card: ICard;
    deleteCard(): void;
    openModal(): void;
}

export function TrelloCard(props: ITrelloCardProps) {
    const { openModal, deleteCard, card } = props;

    return (
        <Card onClick={openModal} className="todo-card" as={"div"} raised>
            <Card.Content>
                <Card.Header className="todo-card--name">
                    {card.name}
                </Card.Header>
                <Card.Description className="todo-card--name">
                    {card.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button negative onClick={deleteCard}>Delete</Button>
            </Card.Content>
        </Card>
    );
}
