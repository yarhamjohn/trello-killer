import * as React from "react";
import { Segment, Button } from "semantic-ui-react";
import { ToDoCard } from "./ToDoCard";
import "../css/CardList.css";

interface ICardListState {
    numCards: number;
}

interface ICardListProps {
    listName: string;
}

export class CardList extends React.Component<ICardListProps, ICardListState> {
    constructor() {
        super();
        this.state = {
            numCards: 0
        }
    }

    public addCard = () => {
        this.setState((prevState) => ({ numCards: prevState.numCards + 1 }));
    }

    public populateCardsSegment = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.state.numCards; i++) {
            cards.push(<ToDoCard key={i} />);
        }
        return cards;
    }

    public render() {
        return (
            <Segment.Group className="card-list">
                <Segment className="header-segment">
                    <textarea className="list-name" defaultValue={this.props.listName} />
                </Segment>
                <Segment className="cards-segment">
                    {this.populateCardsSegment()}
                </Segment>
                <Segment className="button-segment">
                    <Button compact primary onClick={this.addCard}>Add a card</Button>
                </Segment>
            </Segment.Group>
        );
    }
}
