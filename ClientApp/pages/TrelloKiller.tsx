import * as React from "react";
import { RouteComponentProps } from "react-router";
import TrelloBoard from "../components/Board/Board";

export function TrelloKiller(props: RouteComponentProps <{}>) {
    return ( <TrelloBoard /> );
}
