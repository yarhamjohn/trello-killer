import * as React from "react";
import { Image, Segment } from "semantic-ui-react";
import { generate } from "shortid";
import { AddCardModal } from "../AddCard/Modal";
import { UpdateCardModal } from "../UpdateCard/Modal";
import { ICard, IList } from "../Common/Interfaces";
import "./List.css";

interface ITrelloListState {
    listName: string;
}

interface ITrelloListProps {
    list: IList;
    deleteList(): void;
    updateList(listName: string, listCards: ICard[]): void;
}

export class TrelloList extends React.Component<ITrelloListProps, ITrelloListState> {
    constructor() {
        super();
        this.state = { listName: "" }
    }
    
    render() {
        return (
            <Segment.Group className="card-list">
                <Segment className="header-segment">
                    <textarea
                        className="list-name"
                        defaultValue={this.props.list.name}
                        onChange={(event: any) => this.changeListName(event.target.value)}
                        onKeyPress={this.updateListNameOnKeyPress}
                        onBlur={this.updateListNameOnBlur} />
                    <Image inline onClick={this.props.deleteList} floated={"right"} src={require("./red_skull_icon.png")} className="delete-list--icon" />
                </Segment>
                <Segment className="cards-segment">
                    {this.getCards()}
                </Segment>
                <Segment className="button-segment">
                    <AddCardModal addCard={(cardName, cardDescription) => this.addCard(cardName, cardDescription)} />
                </Segment>
            </Segment.Group>
        );
    };

    getCards = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.props.list.cards.length; i++) {

            const card = this.props.list.cards[i];
            const cardId = card.cardId;
            cards.push(
                <UpdateCardModal key={cardId}
                    card={card}
                    deleteCard={() => this.deleteCard(cardId)}
                    updateCard={(cardName, cardDescription) => { this.updateCard(cardId, cardName, cardDescription) }}
                />
            );
        }

        return cards;
    };

    addCard = (cardName: string, cardDescription: string) => {
        const newCard = { cardId: generate(), name: cardName, description: cardDescription }
        const cards = [...this.props.list.cards, newCard];

        this.props.updateList(this.props.list.name, cards);
    };

    deleteCard = (cardId: string) => {
        const filteredCards = this.props.list.cards.filter((element) => element.cardId !== cardId);
        this.props.updateList(this.props.list.name, filteredCards);
    };

    updateCard = (cardId: string, cardName: string, cardDescription: string) => {
        const cards = [...this.props.list.cards];
        const cardIndex = this.getIndexToUpdate(cardId);

        const newCard = { cardId: cardId, name: cardName, description: cardDescription };
        cards.splice(cardIndex, 1, newCard);

        this.props.updateList(this.props.list.name, cards);
    };

    changeListName = (input: string) => this.setState({ listName: input });

    updateListNameOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    updateListNameOnBlur = () => this.props.updateList(this.state.listName, this.props.list.cards);

    getIndexToUpdate = (cardId: string) => {
        const cardIds = [...this.props.list.cards].map((element) => { return element.cardId; });
        return cardIds.indexOf(cardId);
    };
}
