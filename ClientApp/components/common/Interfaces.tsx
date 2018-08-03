import * as React from "react";

interface ICard {
    id: string;
    name: string;
    description: string;
}

interface IList {
    id: string;
    name: string;
    cards: ICard[];
};

export {ICard, IList}
