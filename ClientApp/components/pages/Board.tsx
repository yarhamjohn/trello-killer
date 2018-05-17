import * as React from "react";
import { RouteComponentProps } from "react-router";
import { CardList } from "../CardList";
import { Button } from "semantic-ui-react";
import { ListModal } from "../ListModal";
import "../../css/Board.css";

interface IBoardState {
    numLists: number;
    listNames: string[];
}
export class Board extends React.Component<RouteComponentProps<{}>, IBoardState> {

    constructor() {
        super();
        this.state = {
            numLists: 0,
            listNames: []
        }
    }

    public createLists = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.state.numLists; i++) {
            cards.push(
                <div className="board-column" key={i}>
                    <CardList listName={this.state.listNames[i]}/>
                </div>);
        }
        return cards;
    }

    public addList = (listName: string) => {
        this.setState((prevState: any) => ({
            numLists: prevState.numLists + 1,
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
