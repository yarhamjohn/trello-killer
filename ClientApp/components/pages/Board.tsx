import * as React from "react";
import { RouteComponentProps } from "react-router";
import { CardList } from "../CardList";

export class Board extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <div className="board">
                <CardList/>
            </div>
        );
    }
}
