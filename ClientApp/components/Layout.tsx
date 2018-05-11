import * as React from "react";
import { NavMenu } from "./NavMenu";

export interface ILayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<ILayoutProps, {}> {
    public render() {
        return (
            <div>
                <NavMenu />
                <div className="layout">
                    {this.props.children}
                </div>
            </div>);
    }
}
