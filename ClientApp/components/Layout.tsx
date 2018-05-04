import * as React from "react";
import { NavMenu } from "./NavMenu";
import {Container} from "semantic-ui-react"

export interface ILayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<ILayoutProps, {}> {
    public render() {
        return <Container>
                    <NavMenu />
                    { this.props.children }
        </Container>;
    }
}
