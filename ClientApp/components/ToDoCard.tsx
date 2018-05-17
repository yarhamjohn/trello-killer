import * as React from "react";
import { Button, Card } from "semantic-ui-react";
import "../css/ToDoCard.css";

export class ToDoCard extends React.Component<{}, {}> {

    public doSomething = () => {
    }

    public render() {
        return (
            <Card className="todo-card" as={"div"} raised onClick={this.doSomething}>
                <Card.Content>
                    <Card.Header>
                        Header
                    </Card.Header>
                    <Card.Description>
                        I am a card
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button size="small" positive>Edit</Button>
                    <Button size="small" negative>Delete</Button>
                </Card.Content>
            </Card>
        );
    }
}
