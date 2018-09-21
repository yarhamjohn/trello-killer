import * as React from "react";

interface ICard {
    cardId: string;
    listIndex: number;
    name: string;
    description: string;
}

interface IList {
    //_id: string;
    listId: string;
    boardIndex: number;
    name: string;
    cards: ICard[];
}

export {ICard, IList}
