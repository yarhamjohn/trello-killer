import * as React from "react";
import { Button, Card } from "semantic-ui-react";

export class ToDoCard extends React.Component<{}, {}> {
    public render() {
        return (
            <Card>
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
