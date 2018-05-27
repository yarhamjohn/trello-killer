import * as React from "react";
import { Segment, Button } from "semantic-ui-react";
import { ToDoCard } from "./ToDoCard";
import "../css/CardList.css";
import { CardModal } from "./CardModal";

interface ICardList {
    id: number;
    name: string;
    description: string;
}

interface ICardListState {
    cards: ICardList[];
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
            cards: [],
            idCount: 0,
            newListName: ""
        }
    }

    public addCard = (cardName: string, cardDescription: string) => {
        this.setState((prevState: any) => ({
            cards: [...prevState.cards, { id: prevState.idCount, name: cardName, description: cardDescription }],
            idCount: prevState.idCount + 1
        }));
    }

    public deleteCard = (cardId: number) => {
        let newCards = this.state.cards.filter((element) => {
            return element.id !== cardId;
        });
        this.setState(() => ({ cards: newCards }));
    };

    public createCards = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.state.cards.length; i++) {

            const id = this.state.cards[i].id;
            cards.push(
                <ToDoCard key={id}
                    cardName={this.state.cards[i].name}
                    cardDescription={this.state.cards[i].description}
                    deleteCard={() => this.deleteCard(id)}
                    updateCard={(newCardName, newCardDescription) => { this.updateCard(id, newCardName, newCardDescription) }}
                />
            );
        }

        return cards;
    };

    public addDeleteListButton = () => {
        if (this.state.cards.length === 0) {
            return <Button secondary onClick={this.props.deleteList}>Delete List</Button>;
        };
    }

    public updateCard = (cardId: number, newCardName: string, newCardDescription: string) => {
        let newCards = [...this.state.cards];
        let cardIndex = this.getIndexToUpdate(cardId);

        newCards.splice(cardIndex, 1, { id: cardId, name: newCardName, description: newCardDescription });

        this.setState(() => ({
            cards: newCards
        }));
    };

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

    private getIndexToUpdate = (cardId: number) => {
        let cardIndex = [...this.state.cards].map((element) => { return element.id; }).indexOf(cardId);
        return cardIndex;
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
                    <CardModal addCard={(cardName, cardDescription) => this.addCard(cardName, cardDescription)}/>
                    {this.addDeleteListButton()}
                </Segment>
            </Segment.Group>
        );
    }

}
