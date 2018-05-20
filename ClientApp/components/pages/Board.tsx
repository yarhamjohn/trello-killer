import * as React from "react";
import { RouteComponentProps } from "react-router";
import { CardList } from "../CardList";
import { ListModal } from "../ListModal";
import "../../css/Board.css";

interface IBoardState {
    listNames: string[];
}
export class Board extends React.Component<RouteComponentProps<{}>, IBoardState> {

    constructor() {
        super();
        this.state = {
            listNames: []
        }
    }

    public createLists = () => {
        let cards: Object[] = [];
        console.log("createLists: " + this.state.listNames);
        for (let i = 0; i < this.state.listNames.length; i++) {
            cards.push(
                <div className="board-column" key={i}>
                    <CardList listName={this.state.listNames[i]} deleteList={() => this.deleteList(i)} updateList={(listName) => this.updateList(i, listName)}/>
                </div>);
        }
        return cards;
    }

    public updateList = (listIndex: number, listName: string) => {
        console.log(this.state.listNames);
        let updatedListNames = this.state.listNames
        console.log(this.state.listNames);
        updatedListNames.splice(listIndex, 1, listName);

        this.setState((prevState) => ({
            listNames: prevState.listNames
        }));

        console.log(this.state.listNames);
    };

    public deleteList = (listIndex: number) => {
        this.setState((prevState) => ({
            listNames: prevState.listNames.splice(listIndex, 1)
        }));
    }

    public addList = (listName: string) => {
        this.setState((prevState) => ({
            listNames: [...prevState.listNames, listName]
        }));
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
    }
}
