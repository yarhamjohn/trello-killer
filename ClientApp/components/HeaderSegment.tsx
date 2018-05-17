import * as React from "react";
import { Segment } from "semantic-ui-react";
import "../css/HeaderSegment.css";

interface IHeaderSegmentProps {
    listName: string;
}

export class HeaderSegment extends React.Component<IHeaderSegmentProps, {}> {
    public render() {
        return (
            <Segment className="header-segment">
                <textarea className="list-name" defaultValue={this.props.listName} />
            </Segment>
        );
    }
}
