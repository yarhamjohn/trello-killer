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
        const { list, deleteList } = this.props;
        return (
            <Segment.Group className="card-list">
                <Segment className="header-segment">
                    <textarea
                        className="list-name"
                        defaultValue={list.name}
                        onChange={(event: any) => this.changeListName(event.target.value)}
                        onKeyPress={this.updateListNameOnKeyPress}
                        onBlur={this.updateListNameOnBlur} />
                    <Image inline onClick={deleteList} floated={"right"} src={require("./red_skull_icon.png")} className="delete-list--icon" />
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
        const cards = this.props.list.cards;

        let cardList: Object[] = [];
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const cardId = card.cardId;

            cardList.push(
                <UpdateCardModal key={cardId}
                    card={card}
                    deleteCard={() => this.deleteCard(cardId)}
                    updateCard={(cardName, cardDescription) => { this.updateCard(cardId, cardName, cardDescription) }}
                />
            );
        }

        return cardList;
    };

    addCard = (cardName: string, cardDescription: string) => {
        const { list, updateList } = this.props;

        const newCard = { cardId: generate(), name: cardName, description: cardDescription }
        const cards = [...list.cards, newCard];

        updateList(list.name, cards);
    };

    deleteCard = (cardId: string) => {
        const { list, updateList } = this.props;

        const filteredCards = list.cards.filter((element) => element.cardId !== cardId);
        updateList(list.name, filteredCards);
    };

    updateCard = (cardId: string, cardName: string, cardDescription: string) => {
        const { list, updateList } = this.props;

        const cards = [...list.cards];
        const cardIndex = this.getIndexToUpdate(cardId);

        const newCard = { cardId: cardId, name: cardName, description: cardDescription };
        cards.splice(cardIndex, 1, newCard);

        updateList(list.name, cards);
    };

    changeListName = (input: string) => this.setState({ listName: input });

    updateListNameOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    updateListNameOnBlur = () => {
        const { list, updateList } = this.props;
        updateList(this.state.listName, list.cards);
    };

    getIndexToUpdate = (cardId: string) => {
        const cards = this.props.list.cards;
        const cardIds = [...cards].map((element) => { return element.cardId; });
        return cardIds.indexOf(cardId);
    };
}
