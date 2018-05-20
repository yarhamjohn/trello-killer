import * as React from "react";
import { Segment, Button } from "semantic-ui-react";
import { ToDoCard } from "./ToDoCard";
import "../css/CardList.css";

interface ICardListState {
    numCards: number;
    newListName: string;
}

interface ICardListProps {
    listName: string;
    deleteList(): void;
    updateList(listName: string): void;
}

export class CardList extends React.Component<ICardListProps, ICardListState> {
    constructor() {
        super();
        this.state = {
            numCards: 0,
            newListName: ""
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

    public addDeleteListButton = () => {
        if (this.state.numCards === 0) {
            return <Button secondary onClick={this.props.deleteList}>Delete List</Button>
        };
    }

    public changeListName = (input: string) => {
        this.setState({ newListName: input });
    };

    public handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    public handleOutsideClick = () => {
        this.props.updateList(this.state.newListName);
    };

    public render() {
        return (
            <Segment.Group className="card-list">
                <Segment className="header-segment">
                    <textarea
                        className="list-name"
                        defaultValue={this.props.listName}
                        onChange={(event: any) => this.changeListName(event.target.value)}
                        onKeyPress={this.handleKeyPress}
                        onBlur={this.handleOutsideClick} />
                </Segment>
                <Segment className="cards-segment">
                    {this.populateCardsSegment()}
                </Segment>
                <Segment className="button-segment">
                    <Button compact primary onClick={this.addCard}>Add a card</Button>
                    {this.addDeleteListButton()}
                </Segment>
            </Segment.Group>
        );
    }

}
