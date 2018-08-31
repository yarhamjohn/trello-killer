import * as React from "react";
import { Loader } from "semantic-ui-react";
import { generate } from "shortid";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TrelloList from "../List/List";
import { AddListModal } from "../AddList/Modal";
import { IList, ICard } from "../Common/Interfaces";
import { retrieveLists, addNewList, modifyList, removeList } from "../../api/api";
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
                        updateList={(listName: string, listCards: ICard[]) => { this.updateList(listId, listName, listCards) }}
                        connectDropTarget={null as any}
                    />
                </div>
            );
        }

        return lists;
    };

    addList = (listName: string) => {
        const newList: IList = { listId: generate(), name: listName, cards: [] };
        const lists = [...this.state.lists, newList];

        this.setState({ lists: lists });
        addNewList(newList);
    };

    deleteList = (listId: string) => {
        const filteredLists = this.state.lists.filter((element) => element.listId !== listId);

        this.setState({ lists: filteredLists });
        removeList(listId);
    };

    updateList = (listId: string, listName: string, listCards: ICard[]) => {
        const lists = [...this.state.lists];
        const listIndex = this.getIndexToUpdate(listId);

        const newList = { listId: listId, name: listName, cards: listCards };
        lists.splice(listIndex, 1, newList);

        this.setState({ lists: lists });
        modifyList(newList);
    };

    getIndexToUpdate = (listId: string) => {
        const listIds = [...this.state.lists].map((element) => { return element.listId; })
        return listIds.indexOf(listId);
    };
}

export default DragDropContext(HTML5Backend)(TrelloBoard);
