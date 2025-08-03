import Database from "@tauri-apps/plugin-sql";
import { defineStore } from 'pinia'

export const useListStore = defineStore('list', {
  state: () => ({
    data: undefined
  }),
  getters: {
    allLists: (state) => state.data,
    getListById: (state) => {
        return (list_id) => state.data.filter((list) => list.list_id == list_id)
    }
  },
  actions: {
    async initializeList() {
        try {
            const db = await Database.load("sqlite:test.db");

            // await db.execute("INSERT INTO lists (name) VALUES ($1)", [
            //     "Test List"
            // ]);

            const list_data = await db.select("SELECT * FROM lists");

            this.data = list_data;

            console.log(list_data[0]);
            console.log(this.data[0]);
            } catch (error) {
            console.log(error);
            setError("Failed to get lists - check console");
        }
    },
    // list_params = {list_name: String, list_type: ENUM["B"|"C"]}
    async addList(list_params) {
            try {
                const db = await Database.load("sqlite:test.db");

                // For some reason the return from this is shit. Instead of returning the new record, it gives the new id so
                //  just run the initialization again.
                const new_listitem = await db.execute(
                    "INSERT INTO lists (list_name, list_type) VALUES ($1, $2)",
                    [list_params.list_name, list_params.list_type]
                );

                // Reload with the new listitems
                await this.initializeList()
                } catch (error) {
                console.log(error);
                setError("Failed to get lists - check console");
            }
        }
  },
})
