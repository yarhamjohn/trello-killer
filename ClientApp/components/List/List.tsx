import * as React from "react";
import { Image, Segment } from "semantic-ui-react";
import { generate } from "shortid";
import { AddCardModal } from "../AddCard/Modal";
import { UpdateCardModal } from "../UpdateCard/Modal";
import { ICard, IList } from "../Common/Interfaces";
import "./List.css";

interface ITrelloListState {
    cards: ICard[];
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
        this.state = {
            cards: [],
            listName: ""
        }
    }

    componentDidMount() {
        let list = this.retrieveLocalStorage(this.props.list.listId);
        if (list.length === 0) {
            return;
        };

        this.setState({
            listName: list[0].name,
            cards: list[0].cards
        });
    };

    componentDidUpdate(prevProps: any) {
        if (prevProps.list !== this.props.list) {
            this.setState({
                listName: this.props.list.name,
                cards: this.props.list.cards,
            });
        }
    };

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
        for (let i = 0; i < this.state.cards.length; i++) {

            const card = this.state.cards[i];
            const id = card.cardId;
            cards.push(
                <UpdateCardModal key={id}
                    card={card}
                    deleteCard={() => this.deleteCard(id)}
                    updateCard={(cardName, cardDescription) => { this.updateCard(id, cardName, cardDescription) }}
                />
            );
        }

        return cards;
    };

    addCard = (cardName: string, cardDescription: string) => {
        let newCards = [...this.state.cards, { cardId: generate(), name: cardName, description: cardDescription }];

        this.setState((prevState: any) => ({ idCount: prevState.idCount + 1 }));
        this.props.updateList(this.state.listName, newCards);
    };

    deleteCard = (cardId: string) => {
        let newCards = this.state.cards.filter((element) => {
            return element.cardId !== cardId;
        });
        this.props.updateList(this.state.listName, newCards);
    };

    updateCard = (cardId: string, cardName: string, cardDescription: string) => {
        let newCards = [...this.state.cards];
        let cardIndex = this.getIndexToUpdate(cardId);

        newCards.splice(cardIndex, 1, { cardId: cardId, name: cardName, description: cardDescription });

        this.props.updateList(this.state.listName, newCards);
    };

    changeListName = (input: string) => this.setState({ listName: input });

    updateListNameOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    updateListNameOnBlur = () => this.props.updateList(this.state.listName, this.state.cards);

    getIndexToUpdate = (cardId: string) => {
        return [...this.state.cards].map((element) => { return element.cardId; }).indexOf(cardId);
    };

    retrieveLocalStorage = (listId: string) => {
        let storedLists = localStorage.getItem("lists");
        let lists = storedLists == null ? [] : JSON.parse(storedLists);

        return lists.filter((list: IList) => list.listId === listId);
    };
}
