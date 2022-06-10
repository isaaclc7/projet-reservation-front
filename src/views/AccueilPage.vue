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
    <div v-if="isOpen" class="">
      Ajouter un terrain
      <form action="">
        <input v-model="terrain.numero" type="text" placeholder="N° terrain" />
        <button @click="creerTerrain">Enregistrer</button>
      </form>
    </div>
    <button @click="openForm">Ajouter terrain</button>
  </div>
</template>

<script>
import { TERRAIN } from "../router/names";
import CarteTerrain from "../components/CarteTerrain.vue";
import {
  getAllTerrains,
  createTerrain,
  //getTerrainByNumero,
} from "../apis/terrains";

export default {
  components: {
    CarteTerrain,
  },
  data() {
    return {
      terrainRoute: TERRAIN,
      terrains: [],
      error: "",
      isOpen: false,
      terrain: {
        numero: "",
      },
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
    openForm() {
      if (this.isOpen == true) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    async creerTerrain() {
      // const terrainAlreadyExists = await getTerrainByNumero(
      //   this.terrain.numero
      // );
      // console.log(JSON.stringify(terrainAlreadyExists));
      // if (terrainAlreadyExists === "") {
      //   createTerrain(this.terrain);
      //   this.$router.go();
      // } else {
      //   console.log("PAS CREE");
      // }
      createTerrain(this.terrain);
    },
  },
  async mounted() {
    this.getTerrains();
  },
};
</script>
