import { IList } from "../components/Common/Interfaces";

export function retrieveLists() {
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

export function addNewList(newList: IList) {
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

export function modifyList(newList: IList) {
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

export function removeList(listId: string) {
    fetch("api/Board/RemoveList", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(listId)
    });
};
