import { IList } from "../shared/Interfaces";

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
};

function addNewList(newList: IList) {
    fetch("api/Board/AddList", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            ListId: newList.listId,
            Name: newList.name,
            Cards: []
        })
    });
};

function modifyList(newList: IList) {
    fetch("api/Board/ModifyList", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            ListId: newList.listId,
            Name: newList.name,
            Cards: newList.cards
        })
    });
};

function removeList(listId: string) {
    fetch("api/Board/RemoveList", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(listId)
    });
};

export {retrieveLists, addNewList, modifyList, removeList};
