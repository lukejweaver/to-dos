<script setup>
import {ref} from 'vue';
import { storeToRefs } from 'pinia';
import { useListStore } from "../stores/list.js";
import { useListItemStore } from "../stores/listitems.js";

const listStore = useListStore();
const listItemStore = useListItemStore();

const { getListItemsFor } = storeToRefs(listItemStore);
const { getListById } = storeToRefs(listStore);

import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const add_item = ref(false)
const newItemName = ref("")

async function createListItem() {
  listItemStore.addListItem({item_name: newItemName.value, list_id: route.params.id})
  add_item.value = false;
}

</script>

<template>
  <main>
    <h1>{{ getListById(route.params.id)[0].list_name }}</h1>
    <hr>
    <a @click="router.go(-1)">back</a>

    <ul>
        <li v-bind:key="item.listitem_id" v-for="item in getListItemsFor(route.params.id)">
            {{ item.item_name }}
        </li>
    </ul>
    <button @click="add_item = true" v-if="!add_item">+</button>

    <div v-else-if="add_item">
        <input type="text" placeholder="Item Name" v-model="newItemName">
        <button @click="createListItem">check</button>
    </div>
    <!--  -->

  </main>
</template>

<style scoped>
h1 {
  text-align: left;
}
</style>
