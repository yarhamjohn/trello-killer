import {ICard, IList} from "../shared/Interfaces";

function retrieveLists() {
    return fetch("api/Board/RetrieveLists",
        {
            method: "POST",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        }
    );
}

function addNewList(newList: IList) {
    fetch("api/Board/AddList", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            ListId: newList.listId,
            BoardIndex: newList.boardIndex,
            Name: newList.name,
            Cards: []
        })
    });
}

function modifyList(newList: IList) {
    fetch("api/Board/ModifyList", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            ListId: newList.listId,
            BoardIndex: newList.boardIndex,
            Name: newList.name,
            Cards: newList.cards
        })
    });
}

function removeList(listId: string) {
    fetch("api/Board/RemoveList", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(listId)
    });
}

function removeCard(cardId: string, sourceListId: string) {
    fetch("api/Board/RemoveCard", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            cardId: cardId,
            sourceListId: sourceListId
        })
    });
}

function addCard(card: ICard, targetListId: string) {
    fetch("api/Board/AddCard", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            card: card,
            targetListId: targetListId
        })
    });
}

export {retrieveLists, addNewList, modifyList, removeList, removeCard, addCard};
