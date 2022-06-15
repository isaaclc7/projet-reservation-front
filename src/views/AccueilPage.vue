<template>
  <div class="container">
    <div class="header">
      <h1 class="header__titre">Tennis Club de Lille</h1>
    </div>
    <ul class="liste__terrains">
      <li v-for="terrain in terrains" :key="terrain.id">
        <router-link
          class="router-link"
          :to="{ name: terrainRoute, params: { id: terrain.id } }"
        >
          <carte-terrain :numero="terrain.numero" />
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
    <button class="bouton-ajout" @click="openForm">
      <img src="@/assets/ajout-terrain.svg" alt="Ajouter un terrain" />
    </button>
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
      await createTerrain(this.terrain);
      this.$router.go();
    },
  },
  async mounted() {
    this.getTerrains();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header__titre {
  margin: 0;
  color: white;
}

.liste__terrains {
  display: flex;
  flex-direction: column;
  gap: 25px;
  list-style: none;
  align-content: center;
  padding: 0;
}

.router-link {
  text-decoration: none;
}

.bouton-ajout {
  background-color: #adff00;
  width: 55px;
  border-radius: 50%;
  height: 55px;
  border-color: #adff00;
  position: fixed;
  top: 90%;
  left: 84%;
}
</style>
