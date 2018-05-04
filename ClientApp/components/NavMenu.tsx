import * as React from 'react';
import {Input, Menu} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";

export class NavMenu extends React.Component<{}, {}> {

    constructor() {
        super();
    }

    public render() {
        return <Menu secondary inverted={true} color={"blue"}>
            <NavLink to={'/'} className={'item'}>
                Home
            </NavLink>
            <NavLink to={'/counter'} className={'item'}>
                Counter
            </NavLink>
            <NavLink to={'/board'} className={'item'}>
                Board
            </NavLink>
            <NavLink to={'/forecast'} className={'item'}>
                Forecast
            </NavLink>
        </Menu>;
    }
}
