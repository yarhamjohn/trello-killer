import {moveCard} from "../../api/api";

function moveCardBetweenLists(card: any, targetListId: string) {
    moveCard(card.card, card.listId, targetListId);
}

export { moveCardBetweenLists };
