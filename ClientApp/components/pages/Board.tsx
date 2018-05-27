import * as React from "react";
import { RouteComponentProps } from "react-router";
import { CardList } from "../CardList";
import { ListModal } from "../ListModal";
import "../../css/Board.css";

interface IList {
    id: number;
    name: string;
};

interface IBoardState {
    listNames: IList[];
    idCount: number;
}
export class Board extends React.Component<RouteComponentProps<{}>, IBoardState> {
    constructor() {
        super();
        this.state = {
            listNames: [],
            idCount: 0
        };
    }

    public render() {
        return (
            <div className="board">
                {this.createLists()}
                <div className="board-column">
                    <ListModal addList={(listName) => this.addList(listName)} />
                </div>
            </div>
        );
    };

    public createLists = () => {
        let lists: Object[] = [];
        for (let i = 0; i < this.state.listNames.length; i++) {

            const id = this.state.listNames[i].id;
            lists.push(
                <div className="board-column" key={id}>
                    <CardList listName={this.state.listNames[i].name} deleteList={() => this.deleteList(id)} updateList={(newListName) => {this.updateList(id, newListName)}}/>
                </div>);
        }

        return lists;
    };
    
    public updateList = (listId: number, newListName: string) => {
        let newListNames = [...this.state.listNames];
        let listIndex = this.getIndexToUpdate(listId);

        newListNames.splice(listIndex, 1, { id: listId, name: newListName });

        this.setState(() => ({
            listNames: newListNames
        }));
    };

    public deleteList = (listId: number) => {
        let newListNames = this.state.listNames.filter((element) => {
            return element.id !== listId;
        });
        this.setState(() => ({ listNames: newListNames }));
    };

    public addList = (listName: string) => {
        this.setState((prevState: any) => ({
            listNames: [...prevState.listNames, { id: prevState.idCount, name: listName }],
            idCount: prevState.idCount + 1
        }));
    };

    private getIndexToUpdate = (listId: number) => {
        let listIndex = [...this.state.listNames].map((element) => { return element.id; }).indexOf(listId);
        return listIndex;
    };
}
