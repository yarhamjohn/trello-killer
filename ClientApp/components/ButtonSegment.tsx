import * as React from "react";
import { Segment, Button } from "semantic-ui-react";

export interface IButtonSegmentProps {
    addCard(): void;
}

export class ButtonSegment extends React.Component<IButtonSegmentProps, {}> {
    public render() {
        return (
            <Segment className="button-segment">
                <Button compact primary onClick={this.props.addCard}>Add a card</Button>
            </Segment>
        );
    }
}
