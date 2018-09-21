import * as React from "react";
import { Loader } from "semantic-ui-react";
import { generate } from "shortid";
import { DragDropContext } from "react-dnd";
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

class TrelloBoard extends React.Component<{}, ITrelloBoardState> {
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
                <div className="board-column">
                    <AddListModal addList={(listName) => this.addList(listName)} />
                </div>
            </div>
        );
    };

    getLists = () => {
        const lists: Object[] = [];
        for (let i = 0; i < this.state.lists.length; i++) {

            const list = this.state.lists[i];
            const listId = list.listId;
            lists.push(
                <div className="board-column" key={listId}>
                    <TrelloList
                        list={list}
                        deleteList={() => this.deleteList(listId)}
                        updateList={(listName: string, listCards: ICard[]) => { this.updateList(listId, list.boardIndex, listName, listCards) }}
                        moveCard={(card: ICard, sourceListId: string, targetListId: string) => { this.moveCardBetweenLists(card, sourceListId, targetListId)}}
                        connectDropTarget={null as any}
                    />
                </div>
            );
        }

        return lists;
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
        this.setState({ lists: filteredLists }, () => this.updateBoardIndexes(filteredLists));
        removeList(listId);
    };

    updateBoardIndexes = (lists: IList[]) => {
        lists.forEach(list => {
            list.boardIndex = lists.indexOf(list);
            list.cards.forEach(card => {
                card.listIndex = list.cards.indexOf(card);
            });
            this.updateList(list.listId, list.boardIndex, list.name, list.cards);
        });
    };

    updateList = (listId: string, listBoardIndex: number, listName: string, listCards: ICard[]) => {
        const lists = [...this.state.lists];
        const listIndex = this.getListIndexToUpdate(listId);

        const newList = { listId: listId, boardIndex: listBoardIndex, name: listName, cards: listCards };
        lists.splice(listIndex, 1, newList);

        this.setState({ lists: lists });
        modifyList(newList);
    };

    moveCardBetweenLists = (card: ICard, sourceListId: string, targetListId: string) => {
        const lists = [...this.state.lists];

        this.removeCard(card, sourceListId, lists);
        this.addCard(card, targetListId, lists);
        this.updateBoardIndexes(lists);

        this.setState({ lists: lists });
    };

    addCard = (card: ICard, targetListId: string, lists: IList[]) => {
        const targetListIndex = this.getListIndexToUpdate(targetListId);
        lists[targetListIndex].cards.push(card);

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

export default DragDropContext(HTML5Backend)(TrelloBoard);
