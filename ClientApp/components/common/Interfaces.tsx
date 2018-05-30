import * as React from "react";

export interface ICard {
    id: string;
    name: string;
    description: string;
}

export interface IList {
    id: string;
    name: string;
    cards: ICard[];
};
