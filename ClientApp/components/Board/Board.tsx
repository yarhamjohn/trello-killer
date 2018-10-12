import * as React from "react";
import * as _ from "lodash";
import { Loader } from "semantic-ui-react";
import { generate } from "shortid";
import {
    ConnectDropTarget,
    DragDropContext,
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor
} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TrelloList from "../List/List";
import { AddListModal } from "../AddList/Modal";
import { IList, ICard } from "../../shared/Interfaces";
import {retrieveLists, addNewList, modifyList, removeList, removeCard, addCard} from "../../api/api";
import "./Board.css";

interface ITrelloBoardState {
    isLoading: Boolean;
    lists: IList[];
};

interface ITrelloListDropProps {
    connectDropTarget: ConnectDropTarget;
};

const listTarget = {
    drop(props: ITrelloListDropProps, monitor: DropTargetMonitor, component: TrelloBoard) {
        const draggedItem: any = monitor.getItem();
        component.moveList(draggedItem.ListIndex, -1);
    }
};

const collect = (connect: DropTargetConnector) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
};

class TrelloBoard extends React.Component<ITrelloListDropProps, ITrelloBoardState> {
    constructor() {
        super();
        this.state = { isLoading: false, lists: [] };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        retrieveLists()
            .then(response => response.json())
            .then(data => this.setState({ isLoading: false, lists: data }));
    };

    render() {
        if (this.state.isLoading) {
            return <Loader active />;
        }
        return (
            <div className="board">
                {this.getLists()}
                {this.props.connectDropTarget(<div className="board-column">
                    <AddListModal addList={(listName) => this.addList(listName)} />
                </div>)}
            </div>
        );
    };

    getLists = () => {
        const listsList: Object[] = [];
        const lists = this.state.lists.sort((a: IList, b: IList) => { return a.boardIndex - b.boardIndex });
        for (let i = 0; i < lists.length; i++) {
            const list = lists[i];
            const listId = list.listId;
            listsList.push(
                <div className="board-column" key={listId}>
                    <TrelloList
                        list={list}
                        deleteList={() => this.deleteList(listId)}
                        updateList={(listName: string, listCards: ICard[]) => { this.updateList(listId, list.boardIndex, listName, listCards) }}
                        moveCard={(card: ICard, sourceListId: string, targetListId: string, targetCardId: string) => { this.moveCardBetweenLists(card, sourceListId, targetListId, targetCardId)}}
                        moveList={(sourceListIndex: number, targetListIndex: number) => { this.moveList(sourceListIndex, targetListIndex)}}
                        connectDropTopTarget={null as any}
                        connectDropBottomTarget={null as any}
                        connectDragSource={null as any}
                    />
                </div>
            );
        }

        return listsList;
    };

    addList = (listName: string) => {
        const targetIndex = this.state.lists.length;
        const newList: IList = { listId: generate(), boardIndex: targetIndex, name: listName, cards: [] };
        const lists = [...this.state.lists, newList];

        this.setState({ lists: lists });
        addNewList(newList);
    };

    deleteList = (listId: string) => {
        const filteredLists = this.state.lists.filter((element) => element.listId !== listId);
        this.setState({ lists: filteredLists }, () => this.updateIndexes(filteredLists));
        removeList(listId);
    };

    moveList = (sourceListIndex: number, targetListIndex: number) => {
        const lists = [...this.state.lists];
        const sourceList = lists[sourceListIndex];

        lists.splice(sourceListIndex, 1);

        if (targetListIndex === -1) {
            lists.push(sourceList);
        } else {
            lists.splice(targetListIndex, 0, sourceList);
        }

        this.updateIndexes(lists);
    };

    updateIndexes = (lists: IList[]) => {
        lists.forEach(list => {
            list.boardIndex = lists.indexOf(list);
            list.cards.forEach(card => {
                card.listIndex = list.cards.indexOf(card);
            });

            const listIndex = this.getListIndexToUpdate(list.listId);
            const newList = { listId: list.listId, boardIndex: list.boardIndex, name: list.name, cards: list.cards };

            lists.splice(listIndex, 1, newList);

            modifyList(newList);
        });

        this.setState({ lists: lists });
    };

    updateList = (listId: string, listBoardIndex: number, listName: string, listCards: ICard[]) => {
        const lists = [...this.state.lists];
        const listIndex = this.getListIndexToUpdate(listId);

        const newList = { listId: listId, boardIndex: listBoardIndex, name: listName, cards: listCards };
        lists.splice(listIndex, 1, newList);

        this.setState({ lists: lists });
        modifyList(newList);
    };

    moveCardBetweenLists = (card: ICard, sourceListId: string, targetListId: string, targetCardId: string) => {
        const lists = [...this.state.lists];

        this.removeCard(card, sourceListId, lists);
        this.addCard(card, targetListId, lists, targetCardId);
        this.updateIndexes(lists);

        this.setState({ lists: lists });
    };

    addCard = (card: ICard, targetListId: string, lists: IList[], targetCardId: string) => {
        const targetListIndex = this.getListIndexToUpdate(targetListId);
        if (targetCardId === "top") {
            lists[targetListIndex].cards.splice(0, 0, card);
        } else if (targetCardId === "bottom") {
            lists[targetListIndex].cards.push(card);
        } else {
            const targetCardIndex = this.getCardIndexToUpdate(lists[targetListIndex], targetCardId);
            lists[targetListIndex].cards.splice(targetCardIndex, 0, card);
        }

        addCard(card, targetListId);
    };

    removeCard = (card: ICard, sourceListId: string, lists: IList[]) => {
        const sourceListIndex = this.getListIndexToUpdate(sourceListId);
        const sourceListCardIndex = this.getCardIndexToUpdate(lists[sourceListIndex], card.cardId);

        lists[sourceListIndex].cards.splice(sourceListCardIndex, 1);
        removeCard(card.cardId, sourceListId);
    };

    getListIndexToUpdate = (listId: string) => {
        const listIds = [...this.state.lists].map((element) => { return element.listId; });
        return listIds.indexOf(listId);
    };


    getCardIndexToUpdate = (list: IList, cardId: string) => {
        const cardIds = [...list.cards].map((element) => { return element.cardId; });
        return cardIds.indexOf(cardId);
    };
}

export default _.flow(
    DropTarget("list", listTarget, collect),
    DragDropContext(HTML5Backend))(TrelloBoard);
