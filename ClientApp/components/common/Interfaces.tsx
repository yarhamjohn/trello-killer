import * as React from "react";

export interface ICard {
    id: number;
    name: string;
    description: string;
}

export interface IList {
    id: number;
    name: string;
    cards: ICard[];
};
