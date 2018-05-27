import * as React from "react";
import { Segment, Button } from "semantic-ui-react";
import { ToDoCard } from "./ToDoCard";
import "../css/CardList.css";
import { CardModal } from "./CardModal";

interface ICardNameList {
    id: number;
    name: string;
};

interface ICardDescriptionList {
    id: number;
    description: string;
};

interface ICardList {
    id: number;
    name: string;
    description: string;
}

interface ICardListState {
    cardNames: ICardNameList[];
    cardDescriptions: ICardDescriptionList[];
    card: ICardList[];
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
            cardNames: [],
            cardDescriptions: [],
            card: [],
            idCount: 0,
            newListName: ""
        }
    }

    public addCard = (cardName: string, cardDescription: string) => {
        this.setState((prevState: any) => ({
            card: [...prevState.card, { id: prevState.idCount, name: cardName, description: cardDescription }],
            cardNames: [...prevState.cardNames, { id: prevState.idCount, name: cardName }],
            cardDescriptions: [...prevState.cardDescriptions, { id: prevState.idCount, description: cardDescription }],
            idCount: prevState.idCount + 1
        }));
    }

    public deleteCard = (cardId: number) => {
        let newCardNames = this.state.cardNames.filter((element) => {
            return element.id !== cardId;
        });
        let newCardDescriptions = this.state.cardDescriptions.filter((element) => {
            return element.id !== cardId;
        });
        this.setState(() => ({ cardNames: newCardNames, cardDescriptions: newCardDescriptions }));
    };

    public createCards = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.state.cardNames.length; i++) {

            const id = this.state.cardNames[i].id;
            cards.push(<ToDoCard key={id} cardName={this.state.cardNames[i].name} cardDescription={this.state.cardDescriptions[i].description} deleteCard={() => this.deleteCard(id)} updateCard={(newCardName) => { this.updateCard(id, newCardName) }}/>);
        }

        return cards;
    };

    public addDeleteListButton = () => {
        if (this.state.cardNames.length === 0) {
            return <Button secondary onClick={this.props.deleteList}>Delete List</Button>;
        };
    }

    public updateCard = (cardId: number, newCardName: string) => {
        let newCardNames = [...this.state.cardNames];
        let cardIndex = this.getIndexToUpdate(cardId);

        newCardNames.splice(cardIndex, 1, { id: cardId, name: newCardName });

        this.setState(() => ({
            cardNames: newCardNames
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
        let cardIndex = [...this.state.cardNames].map((element) => { return element.id; }).indexOf(cardId);
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
