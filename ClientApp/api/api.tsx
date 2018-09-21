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

function moveCard(card: ICard, sourceListId: string, targetListId: string) {
    fetch("api/Board/MoveCard", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            card: card,
            sourceListId: sourceListId,
            targetListId: targetListId
        })
    });
}

export {retrieveLists, addNewList, modifyList, removeList, moveCard};
