import * as React from 'react';
import { NavMenu } from './NavMenu';
import {Container} from 'semantic-ui-react'

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <Container>
                    <NavMenu />
                    { this.props.children }
        </Container>;
    }
}
