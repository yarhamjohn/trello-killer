import * as React from "react";
import { RouteComponentProps } from "react-router";
import { CardList } from "../CardList";
import { Button } from "semantic-ui-react";

interface IBoardState {
    numLists: number;
}
export class Board extends React.Component<RouteComponentProps<{}>, IBoardState> {

    constructor() {
        super();
        this.state = { numLists: 0 }
    }

    public createLists = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.state.numLists; i++) {
            cards.push(
                <div className="board-column" key={i}>
                    <CardList />
                </div>);
        }
        return cards;
    }

    public addList = () => {
        this.setState((prevState) => ({ numLists: prevState.numLists + 1 }));
    }

    public render() {
        return (
            <div className="board">
                {this.createLists()}
                <div className="board-column">
                    <Button positive fluid onClick={this.addList}>Add New List</Button>
                </div>
            </div>
        );
    }
}
