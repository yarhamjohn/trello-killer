import * as React from "react";
import { NavMenu } from "../NavMenu/NavMenu";
import "./Layout.css";

export interface ILayoutProps {
    children?: React.ReactNode;
}

export function Layout(props: ILayoutProps) {
    return (
        <div>
            <NavMenu />
            <div className="layout">
                {props.children}
            </div>
        </div>
    );
}
