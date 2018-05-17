import * as React from "react";
import { Segment } from "semantic-ui-react";
import { ButtonSegment } from "./ButtonSegment";
import { HeaderSegment } from "./HeaderSegment";
import { CardSegment } from "./CardsSegment";
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

    public render() {
        return (
            <Segment.Group className="card-list">
                <HeaderSegment listName={this.props.listName}/>
                <CardSegment numCards={this.state.numCards}/>
                <ButtonSegment addCard={this.addCard} />
            </Segment.Group>
        );
    }
}
