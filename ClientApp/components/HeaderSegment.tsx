import * as React from "react";
import { Segment, Card } from "semantic-ui-react";

export class HeaderSegment extends React.Component<{}, {}> {
    public render() {
        return (
            <Segment className="header-segment">
                <textarea className="list-name">
                    List Name
                </textarea>
            </Segment>
        );
    }
}
