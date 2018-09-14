import * as React from "react";
import { DragSource, DragSourceCollector, DragSourceConnector, ConnectDragSource } from "react-dnd";
import { Button, Card } from "semantic-ui-react";
import { ICard } from "../../shared/Interfaces";
import "./Card.css";

interface ITrelloCardDragProps {
    connectDragSource: ConnectDragSource;
}

interface ITrelloCardProps extends ITrelloCardDragProps {
    card: ICard;
    deleteCard(): void;
    openModal(): void;
}

const cardSource = {
    beginDrag(props: ITrelloCardProps) {
        return {id: props.card.cardId}
    }
};

const collect = (connect: DragSourceConnector) => ({
    connectDragSource: connect.dragSource()
});

class TrelloCard extends React.Component<ITrelloCardProps, {}> {
    render() {
        const { connectDragSource, openModal, deleteCard, card } = this.props;

            return connectDragSource(
                <div>
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
                </div>
            );
            }
}

export default DragSource("card", cardSource, collect)(TrelloCard);
