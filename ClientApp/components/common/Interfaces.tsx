import * as React from "react";

export interface ICard {
    id: number;
    name: string;
    description: string;
}

export interface IList {
    id: string;
    name: string;
    cards: ICard[];
};
