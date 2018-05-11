import * as React from "react";
import { Segment, Card } from "semantic-ui-react";
import { ToDoCard } from "./ToDoCard";

interface ICardSegmentProps {
    numCards: number;
}

export class CardSegment extends React.Component<ICardSegmentProps, {}> {

    public createCards = () => {
        let cards: Object[] = [];
        for (let i = 0; i < this.props.numCards; i++) {
            cards.push(<ToDoCard key={i}/>);
        }
        return cards;
    }

    public render() {
        return (
            <Segment className="cards-segment">
                {this.createCards()}
            </Segment>
        );
    }
}
