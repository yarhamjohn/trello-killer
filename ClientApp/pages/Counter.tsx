import * as React from "react";
import { RouteComponentProps } from "react-router";
import {Button, Label} from "semantic-ui-react";

interface ICounterState {
    currentCount: number;
}

export class Counter extends React.Component<RouteComponentProps<{}>, ICounterState> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }

    public render() {
        return <div>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p>Current count: <Label color={"blue"} size={"huge"} circular={true}> { this.state.currentCount }</Label></p>

            <Button color={"red"} size={"huge"} onClick={ () => { this.incrementCounter() } }>Increment</Button>
        </div>;
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
}
