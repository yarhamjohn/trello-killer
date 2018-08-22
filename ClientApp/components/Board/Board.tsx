import * as React from "react";
import { generate } from "shortid";
import { TrelloList } from "../List/List";
import { AddListModal } from "../AddList/Modal";
import { IList, ICard } from "../Common/Interfaces";
import { Loader } from "semantic-ui-react";
import "./Board.css";

interface ITrelloBoardState {
    isLoading: Boolean;
    lists: IList[];
};

export class TrelloBoard extends React.Component<{}, ITrelloBoardState> {
    constructor() {
        super();
        this.state = { isLoading: false, lists: [] };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.retrieveLists();
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
            const id = list.listId;
            lists.push(
                <div className="board-column" key={id}>
                    <TrelloList
                        list={list}
                        deleteList={() => this.deleteList(id)}
                        updateList={(listName, listCards) => { this.updateList(id, listName, listCards) }}
                    />
                </div>
            );
        }

        return lists;
    };

    addList = (listName: string) => {
        const newList: IList = { listId: generate(), name: listName, cards: [] };
        const newLists = [...this.state.lists, newList];

        this.setState({ lists: newLists });
        this.addNewList(newList);
    };

    deleteList = (listId: string) => {
        const newLists = this.state.lists.filter((element) => {
            return element.listId !== listId;
        });

        this.setState({ lists: newLists });
        this.removeList(listId);
    };

    updateList = (listId: string, listName: string, listCards: ICard[]) => {
        const newLists = [...this.state.lists];
        const listIndex = this.getIndexToUpdate(listId);

        const newList = { listId: listId, name: listName, cards: listCards };
        console.log(listCards);
        newLists.splice(listIndex, 1, newList);

        this.setState({ lists: newLists });
        this.modifyList(newList);
    };

    getIndexToUpdate = (listId: string) => {
        return [...this.state.lists].map((element) => { return element.listId; }).indexOf(listId);
    };

    retrieveLists = () => {
        fetch("api/Board/RetrieveLists",
            {
                method: "POST",
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                }
            }
        )
        .then(response => response.json())
        .then(data => this.setState({ isLoading: false, lists: data }));
    };

    addNewList = (newList: IList) => {
        fetch("api/Board/AddList", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                ListId: newList.listId,
                Name: newList.name,
                Cards: []
            })
        });
    };

    modifyList = (newList: IList) => {
        fetch("api/Board/ModifyList", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                ListId: newList.listId,
                Name: newList.name,
                Cards: newList.cards
            })
        });
    };

    removeList = (listId: string) => {
        fetch("api/Board/RemoveList", {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(listId)
        });
    };
}
