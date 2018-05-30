import * as React from "react";
import { Image, Segment } from "semantic-ui-react";
import { NewCardModal } from "./NewCardModal";
import { CardUpdateModal } from "./CardUpdateModal";
import { ICard, IList } from "./common/Interfaces";
import "../css/CardList.css";

interface ICardListState {
    cards: ICard[];
    idCount: number;
    listName: string;
}

interface ICardListProps {
    list: IList;
    deleteList(): void;
    updateListName(listName: string): void;
    updateListCards(listCards: ICard[]): void;
}

export class CardList extends React.Component<ICardListProps, ICardListState> {
    constructor() {
        super();
        this.state = {
            cards: [],
            idCount: 0, // Use id generator
            listName: ""
        }
    }

    componentDidMount() {
        let list = this.retrieveLocalStorage(this.props.list.id);
        if (list.length === 0) {
            return;
        };

        let card = list[0].cards.length === 0 ? { id: 0 } : [...list[0].cards].sort((card: ICard) => card.id).pop();
        this.setState({
            listName: list[0].name,
            cards: list[0].cards,
            idCount: card.id + 1
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
                    <Image inline onClick={this.props.deleteList} floated={"right"} src={require("../images/red_skull_icon.png")} className="delete-list--icon" />
                </Segment>
                <Segment className="cards-segment">
                    {this.getCards()}
                </Segment>
                <Segment className="button-segment">
                    <NewCardModal addCard={(cardName, cardDescription) => this.addCard(cardName, cardDescription)} />
                </Segment>
            </Segment.Group>
        );
    };

    getCards = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.state.cards.length; i++) {

            const card = this.state.cards[i];
            const id = card.id;
            cards.push(
                <CardUpdateModal key={id}
                    card={card}
                    deleteCard={() => this.deleteCard(id)}
                    updateCard={(cardName, cardDescription) => { this.updateCard(id, cardName, cardDescription) }}
                />
            );
        }

        return cards;
    };

    addCard = (cardName: string, cardDescription: string) => {
        let newCards = [...this.state.cards, { id: this.state.idCount, name: cardName, description: cardDescription }];
        this.props.updateListCards(newCards);
    };

    deleteCard = (cardId: number) => {
        let newCards = this.state.cards.filter((element) => {
            return element.id !== cardId;
        });
        this.props.updateListCards(newCards);
    };

    updateCard = (cardId: number, cardName: string, cardDescription: string) => {
        let newCards = [...this.state.cards];
        let cardIndex = this.getIndexToUpdate(cardId);

        newCards.splice(cardIndex, 1, { id: cardId, name: cardName, description: cardDescription });

        this.props.updateListCards(newCards);
    };

    changeListName = (input: string) => this.setState({ listName: input });

    updateListNameOnKeyPress = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    updateListNameOnBlur = () => this.props.updateListName(this.state.listName);

    getIndexToUpdate = (cardId: number) => {
        let cardIndex = [...this.state.cards].map((element) => { return element.id; }).indexOf(cardId);
        return cardIndex;
    };

    retrieveLocalStorage = (listId: number) => {
        let storedLists = localStorage.getItem("lists");
        let lists = storedLists == null ? [] : JSON.parse(storedLists);

        return lists.filter((list: IList) => list.id === listId);
    };
}
