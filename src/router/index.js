import Vue from "vue";
import VueRouter from "vue-router";

import * as names from "./names";

import Accueil from "../views/AccueilPage.vue";
import Terrain from "../views/TerrainPage.vue";
import Reservation from "../views/ReservationPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: names.ACCUEIL,
    component: Accueil,
  },
  {
    path: "/terrain/:id",
    name: names.TERRAIN,
    component: Terrain,
  },
  {
    path: "/reservation/:id",
    name: names.RESERVATION,
    component: Reservation,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
