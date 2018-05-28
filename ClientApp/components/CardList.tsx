import * as React from "react";
import { Image, Segment, Button } from "semantic-ui-react";
import "../css/CardList.css";
import { NewCardModal } from "./NewCardModal";
import { CardUpdateModal } from "./CardUpdateModal";

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
                <CardUpdateModal key={id}
                    cardName={this.state.cards[i].name}
                    cardDescription={this.state.cards[i].description}
                    deleteCard={() => this.deleteCard(id)}
                    updateCard={(newCardName, newCardDescription) => { this.updateCard(id, newCardName, newCardDescription) }}
                />
            );
        }

        return cards;
    };

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
                    <Image mini inline onClick={this.props.deleteList} floated={"right"} src={require("../images/red_skull_icon.png")} className="delete-list--icon"/>
                </Segment>
                <Segment className="cards-segment">
                    {this.createCards()}
                </Segment>
                <Segment className="button-segment">
                    <NewCardModal addCard={(cardName, cardDescription) => this.addCard(cardName, cardDescription)}/>
                </Segment>
            </Segment.Group>
        );
    }

}
