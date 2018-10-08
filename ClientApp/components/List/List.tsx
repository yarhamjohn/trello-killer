import * as React from "react";
import * as _ from "lodash";
import { Image, Segment } from "semantic-ui-react";
import { generate } from "shortid";
import {
    DropTarget,
    DragSource,
    DragLayer,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragLayerMonitor
} from "react-dnd";
import { AddCardModal } from "../AddCard/Modal";
import { UpdateCardModal } from "../UpdateCard/Modal";
import { ICard, IList } from "../../shared/Interfaces";
import "./List.css";

interface ITrelloListState {
    listName: string;
}

interface ITrelloListDropProps {
    connectDropTarget: ConnectDropTarget;
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
    isOver: boolean;
    itemType: string;
}

interface ITrelloListProps extends ITrelloListDropProps {
    list: IList;
    deleteList(): void;
    updateList(listName: string, listCards: ICard[]): void;
    moveCard(card: ICard, sourceListId: string, targetListId: string, targetCardId: string): void;
    moveList(sourceListIndex: number, targetListIndex: number): void;
}

const listTarget = {
    drop(props: ITrelloListProps, monitor: DropTargetMonitor) {
        const draggedItem: any = monitor.getItem();
        if (monitor.getItemType() === "card") {
            props.moveCard(draggedItem.card, draggedItem.sourceListId, props.list.listId, "");
        } else {
            props.moveList(draggedItem.ListIndex, props.list.boardIndex);
        }
    }
};

const targetCollect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
};

const listSource = {
    beginDrag(props: ITrelloListProps) {
        return {ListIndex: props.list.boardIndex};
    }
};

const sourceCollect = (connect: DragSourceConnector) => ({
    connectDragSource: connect.dragSource()
});

class TrelloList extends React.Component<ITrelloListProps, ITrelloListState> {
    constructor() {
        super();
        this.state = { listName: "" }
    }

    componentDidMount() {
        this.setState({ listName: this.props.list.name });
    };

    render() {
        const { connectDragSource, connectDropTarget, list, deleteList, isDragging, isOver, itemType } = this.props;
        const newCardSpace = isDragging && isOver && itemType === "card" ? <div style={{height: 150}}></div> : null;

        return (
            connectDragSource(<div className="card-list">
                <Segment.Group>
                    {connectDropTarget(<div><Segment className="header-segment">
                        <textarea
                            className="list-name"
                            defaultValue={list.name}
                            onChange={(event: any) => this.changeListName(event.target.value)}
                            onKeyPress={this.updateListNameOnKeyPress}
                            onBlur={this.updateListNameOnBlur} />
                        <Image inline onClick={deleteList} floated={"right"} src={require("../../shared/images/red_skull_icon.png")} className="delete-list--icon" />
                    </Segment></div>)}
                    <Segment className="cards-segment">
                        {this.getCards()}
                        {newCardSpace}
                    </Segment>
                    <Segment className="button-segment">
                        <AddCardModal addCard={(cardName, cardDescription) => this.addCard(cardName, cardDescription)} />
                    </Segment>
                </Segment.Group>
            </div>)
        );
    };

    getCards = () => {
        const list = this.props.list;
        const cards = list.cards.sort((a: ICard, b: ICard) => {return a.listIndex - b.listIndex});

        let cardList: Object[] = [];
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const cardId = card.cardId;

            cardList.push(
                <UpdateCardModal key={cardId}
                    listId={list.listId}
                    card={card}
                    deleteCard={() => this.deleteCard(cardId)}
                    updateCard={(cardName, cardDescription) => { this.updateCard(cardId, card.listIndex, cardName, cardDescription) }}
                    moveCard={(card, sourceListId, targetListId, targetCardId) => this.props.moveCard(card, sourceListId, targetListId, targetCardId)}
                />
            );
        }

        return cardList;
    };

    addCard = (cardName: string, cardDescription: string) => {
        const { list, updateList } = this.props;
        const targetIndex = list.cards.length;
        const newCard = { cardId: generate(), listIndex: targetIndex, name: cardName, description: cardDescription };
        const cards = [...list.cards, newCard];

        updateList(list.name, cards);
    };

    deleteCard = (cardId: string) => {
        const { list, updateList } = this.props;

        const filteredCards = list.cards.filter((element) => element.cardId !== cardId);
        this.updateListIndexes(filteredCards);
        updateList(list.name, filteredCards);
    };

    updateListIndexes = (cards: ICard[]) => {
        cards.forEach(card => {
            card.listIndex = cards.indexOf(card);
        });
    };

    updateCard = (cardId: string, cardListIndex: number, cardName: string, cardDescription: string) => {
        const { list, updateList } = this.props;

        const cards = [...list.cards];
        const cardIndex = this.getIndexToUpdate(cardId);

        const newCard = { cardId: cardId, listIndex: cardListIndex, name: cardName, description: cardDescription };
        cards.splice(cardIndex, 1, newCard);

        updateList(list.name, cards);
    };

    changeListName = (input: string) => this.setState({ listName: input });

    updateListNameOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    updateListNameOnBlur = () => {
        const { list, updateList } = this.props;
        updateList(this.state.listName, list.cards);
    };

    getIndexToUpdate = (cardId: string) => {
        const cards = this.props.list.cards;
        const cardIds = [...cards].map((element) => { return element.cardId; });
        return cardIds.indexOf(cardId);
    };
}

const collect = (monitor: DragLayerMonitor) => {
    return {
        isDragging: monitor.isDragging(),
        itemType: monitor.getItemType()
    }
};

export default _.flow(
    DropTarget(["card", "list"], listTarget, targetCollect),
    DragSource("list", listSource, sourceCollect),
    DragLayer(collect))(TrelloList);
