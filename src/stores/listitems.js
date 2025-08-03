import Database from "@tauri-apps/plugin-sql";
import { defineStore } from 'pinia'

export const useListItemStore = defineStore('listitem', {
  state: () => ({
    data: []
  }),
  getters: {
    allListItems: (state) => state.data,
    getListItemsFor: (state) => {
        return (list_id) => state.data.filter((listitem) => listitem.list_id == list_id)
    }
  },
  actions: {
    async initializeListItem() {
        try {
            const db = await Database.load("sqlite:test.db");

            const listitems_data = await db.select("SELECT * FROM listitems");

            this.data = listitems_data;
            } catch (error) {
            console.log(error);
            setError("Failed to get lists - check console");
        }
    },
    // item_params = {item_name: String, list_id: Integer}
    async addListItem(item_params) {
        try {
            const db = await Database.load("sqlite:test.db");

            // For some reason the return from this is shit. Instead of returning the new record, it gives the new id so
            //  just run the initialization again.
            const new_listitem = await db.execute(
                "INSERT INTO listitems (item_name, list_id) VALUES ($1, $2)",
                [item_params.item_name, item_params.list_id]
            );

            // Reload with the new listitems
            await this.initializeListItem()
            } catch (error) {
            console.log(error);
            setError("Failed to get lists - check console");
        }
    }
  },
})
