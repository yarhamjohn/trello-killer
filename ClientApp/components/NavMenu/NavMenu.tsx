import * as React from "react";
import { Image, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export function NavMenu() {
    return (
        <div>
            <Menu pointing={true}>
                <Menu.Item header>
                    <Image src={require("../../shared/images/trello_killer_icon.png")} avatar />
                    Trello Killer</Menu.Item>
                <NavLink exact to={"/"} className={"item"}>
                    Home
                </NavLink>
                <NavLink to={"/counter"} className={"item"}>
                    Counter
                </NavLink>
                <NavLink to={"/trellokiller"} className={"item"}>
                    Trello Killer
                </NavLink>
                <NavLink to={"/forecast"} className={"item"}>
                    Forecast
                </NavLink>
            </Menu>
        </div>
    );
}
