import * as React from "react";

interface ICard {
    cardId: string;
    name: string;
    description: string;
}

interface IList {
    listId: string;
    name: string;
    cards: ICard[];
};

export {ICard, IList}
