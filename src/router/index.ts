import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Jokes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Jokes.vue"),
  },
  {
    path: "/jokes",
    name: "Jokes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Jokes.vue"),
  },
  {
    path: "/random-jokes",
    name: "RandomJokes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RandomJokes.vue"),
  },
  {
    path: "/jokes/joke/:id",
    name: "Joke",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Joke.vue"),
  },
  {
    path: "/random-jokes/joke/:id",
    name: "RandomJoke",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RandomJoke.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
