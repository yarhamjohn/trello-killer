import * as React from "react";
import { Segment, Button } from "semantic-ui-react";
import { ToDoCard } from "./ToDoCard";
import "../css/CardList.css";
import { CardModal } from "./CardModal";

interface IList {
    id: number;
    name: string;
};

interface ICardListState {
    numCards: number;
    cardNames: IList[];
    idCount: number;
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
            cardNames: [],
            idCount: 0,
            newListName: ""
        }
    }

    public addCard = (cardName: string) => {
        this.setState((prevState: any) => ({
            cardNames: [...prevState.cardNames, { id: prevState.idCount, name: cardName }],
            idCount: prevState.idCount + 1
        }));
    }

    public createCards = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.state.cardNames.length; i++) {

            const id = this.state.cardNames[i].id;
            cards.push(<ToDoCard key={id} cardName={this.state.cardNames[i].name}/>);
        }

        return cards;
    };

    public addDeleteListButton = () => {
        if (this.state.numCards === 0) {
            return <Button secondary onClick={this.props.deleteList}>Delete List</Button>;
        };
    }

    public changeListName = (input: string) => {
        this.setState({ newListName: input });
    };

    public changeListNameOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    public changeListNameOnOutsideClick = () => {
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
                        onKeyPress={this.changeListNameOnKeyPress}
                        onBlur={this.changeListNameOnOutsideClick} />
                </Segment>
                <Segment className="cards-segment">
                    {this.createCards()}
                </Segment>
                <Segment className="button-segment">
                    <CardModal addCard={(cardName) => this.addCard(cardName)}/>
                    {this.addDeleteListButton()}
                </Segment>
            </Segment.Group>
        );
    }

}
