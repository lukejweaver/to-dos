import { createApp } from "vue";
import { createPinia } from "pinia";


import App from "./App.vue";
import { initializeStores } from "./stores/store.js"
import { router } from "./router/index.js"

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

// Init store after using pinia
initializeStores();

app.use(router)
app.mount("#app")
