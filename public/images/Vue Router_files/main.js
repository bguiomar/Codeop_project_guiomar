import { createApp } from "/node_modules/.vite/vue.js?v=791c837d";
import "/src/tailwind.css?t=1649801654574";
import App from "/src/App.vue?t=1649801543063";
import { routes } from "/src/routes.js?t=1649801654574";
import { createRouter, createWebHistory } from "/node_modules/.vite/vue-router.js?v=791c837d";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);

app.mount("#app");
