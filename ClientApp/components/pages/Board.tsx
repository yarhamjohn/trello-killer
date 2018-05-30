import * as React from "react";
import { generate } from "shortid";
import { RouteComponentProps } from "react-router";
import { CardList } from "../CardList";
import { NewListModal } from "../NewListModal";
import { IList, ICard } from "../common/Interfaces";
import "../../css/Board.css";

interface IBoardState {
    lists: IList[];
};

export class Board extends React.Component<RouteComponentProps<{}>, IBoardState> {
    constructor() {
        super();
        this.state = {
            lists: []
        };
    }

    componentDidMount() {
        let storedLists = this.retrieveLocalStorage();
        if (storedLists.length === 0) {
            return;
        };

        this.setState({
            lists: storedLists,
        });
    };

    render() {
        return (
            <div className="board">
                {this.getLists()}
                <div className="board-column">
                    <NewListModal addList={(listName) => this.addList(listName)} />
                </div>
            </div>
        );
    };

    getLists = () => {
        let lists: Object[] = [];
        for (let i = 0; i < this.state.lists.length; i++) {

            const list = this.state.lists[i];
            const id = list.id;
            lists.push(
                <div className="board-column" key={id}>
                    <CardList
                        list={list}
                        deleteList={() => this.deleteList(id)}
                        updateListName={(listName) => { this.updateList(id, listName, list.cards) }}
                        updateListCards={(listCards) => { this.updateList(id, list.name, listCards) }}
                    />
                </div>
            );
        }

        return lists;
    };

    addList = (listName: string) => {
        let newLists = [...this.state.lists, { id: generate(), name: listName, cards: [] }];
        this.setState({ lists: newLists });
        this.setLocalStorage("lists", newLists);
    };

    deleteList = (listId: string) => {
        let newLists = this.state.lists.filter((element) => {
            return element.id !== listId;
        });

        this.setState({ lists: newLists });
        this.setLocalStorage("lists", newLists);
    };

    updateList = (listId: string, listName: string, listCards: ICard[]) => {
        let newLists = [...this.state.lists];
        let listIndex = this.getIndexToUpdate(listId);

        newLists.splice(listIndex, 1, { id: listId, name: listName, cards: listCards });

        this.setState({ lists: newLists });
        this.setLocalStorage("lists", newLists);
    };

    private getIndexToUpdate = (listId: string) => {
        return [...this.state.lists].map((element) => { return element.id; }).indexOf(listId);
    };

    private setLocalStorage(key: string, value: IList[]) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    private retrieveLocalStorage = () => {
        let storedLists = localStorage.getItem("lists");
        return storedLists == null ? [] : JSON.parse(storedLists);
    };
}
