import * as React from "react";
import { Segment } from "semantic-ui-react";
import { ButtonSegment } from "./ButtonSegment";
import { HeaderSegment } from "./HeaderSegment";
import { CardSegment } from "./CardSegment";

export interface ICardListState {
    numCards: number;
}

export class CardList extends React.Component<{}, ICardListState> {
    constructor() {
        super();
        this.state = { numCards: 0 }
    }

    public addCard = () => {
        console.log("add card to list");
        this.setState((prevState) => ({ numCards: prevState.numCards + 1 }));
    }

    public render() {
        return (
            <Segment.Group className="CardList">
                <HeaderSegment />
                <CardSegment numCards={this.state.numCards}/>
                <ButtonSegment addCard={this.addCard} />
            </Segment.Group>
        );
    }
}
