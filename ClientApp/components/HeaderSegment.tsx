import * as React from "react";
import { Segment, Card } from "semantic-ui-react";

export class HeaderSegment extends React.Component<{}, {}> {
    public render() {
        return (
            <Segment className="HeaderSegment">
                List Name
            </Segment>
        );
    }
}
