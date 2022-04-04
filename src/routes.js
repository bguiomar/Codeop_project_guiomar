import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";
import Read from "./views/Read.vue";
import Reading from "./views/Reading.vue";
import Wanted from "./views/Wanted.vue";

export const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/read", name: "Read", component: Read },
  { path: "/reading", name: "Reading", component: Reading },
  { path: "/wanted", name: "Wanted", component: Wanted },

  { path: "/:path(.*)", component: NotFound },
];
