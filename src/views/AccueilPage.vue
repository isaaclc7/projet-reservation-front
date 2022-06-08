<template>
  <div>
    <div class="header">
      <h1>Tennis Club de Lille</h1>
    </div>
    <ul>
      <li v-for="terrain in terrains" :key="terrain.id">
        <router-link
          class="router-link"
          :to="{ name: terrainRoute, params: { id: terrain.id } }"
        >
          <carte-terrain :nom="terrain.numero" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { TERRAIN } from "../router/names";
import CarteTerrain from "../components/CarteTerrain.vue";
import { getAllTerrains } from "../apis/terrains";

export default {
  components: {
    CarteTerrain,
  },
  data() {
    return {
      terrainRoute: TERRAIN,
      terrains: {},
      error: "",
    };
  },
  methods: {
    async getTerrains() {
      try {
        this.terrains = await getAllTerrains();
        console.log(this.terrains);
      } catch (e) {
        this.error = e;
      }
    },
  },
  async mounted() {
    this.getTerrains();
  },
};
</script>
