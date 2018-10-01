import * as React from "react";
import * as _ from "lodash";
import {ConnectDropTarget, DropTargetMonitor, DropTargetConnector, DropTarget, ConnectDragSource, DragSource, DragSourceConnector} from "react-dnd";
import {Button, Card} from "semantic-ui-react";
import {ICard} from "../../shared/Interfaces";
import "./Card.css";

interface ITrelloCardDragDropProps {
    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
}

interface ITrelloCardProps extends ITrelloCardDragDropProps {
    listId: string;
    card: ICard;
    deleteCard(): void;
    openModal(): void;
    moveCard(card: ICard, sourceListId: string, targetListId: string, targetCardId: string): void;
}

const cardTarget = {
    drop(props: ITrelloCardProps, monitor: DropTargetMonitor) {
        const dropped: any = monitor.getItem();
        props.moveCard(dropped.card, dropped.sourceListId, props.listId, props.card.cardId);
    }
};

const targetCollect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
    }
};

const cardSource = {
    beginDrag(props: ITrelloCardProps) {
        return {card: props.card, sourceListId: props.listId};
    }
};

const sourceCollect = (connect: DragSourceConnector) => ({
    connectDragSource: connect.dragSource()
});

class TrelloCard extends React.Component<ITrelloCardProps, {}> {
    render() {
        const { connectDropTarget, connectDragSource, openModal, deleteCard, card } = this.props;

            return connectDropTarget(connectDragSource(
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
            ));
            }
}

export default _.flow(
    DropTarget("card", cardTarget, targetCollect),
    DragSource("card", cardSource, sourceCollect))(TrelloCard);
