import { useListStore } from './list.js';
import { useListItemStore } from './listitems.js'

export async function initializeStores() {
    await useListStore().initializeList();
    await useListItemStore().initializeListItem();
}
