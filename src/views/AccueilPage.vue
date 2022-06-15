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
    <div v-if="isOpen" class="div-form-ajouter-terrain">
      <p>Ajouter un terrain</p>
      <form class="form-ajouter-terrain" action="">
        <input class="form-nombre-terrain" v-model="terrain.numero" type="text" placeholder="N° terrain" />
        <button class="form-enregistrer-terrain" @click="creerTerrain">Enregistrer</button>
      </form>
      <button v-if="isOpen" class="form-bouton-fermer" @click="closeForm">
          <img src="@/assets/fermer.svg" alt="Fermer le formulaire" />
      </button>
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
    closeForm() {
      this.isOpen = false
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

.div-form-ajouter-terrain {
  border: 3px solid #adff00;
  background-color: #6994c5;
  width: 300px;
  height: 160px;
  position: fixed;
  top: 40%;
  padding: 10px;
  border-radius: 5px;
}

.form-ajouter-terrain {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-nombre-terrain {
  height: 35px;
  width: 80%;
  border: 2px solid #adff00;
  border-radius: 5px;
  background-color: #0d2f4e;
  color: #adff00;
  font-weight: bold;
  text-align: center;
  text-emphasis-color: #adff00;
}
.form-enregistrer-terrain {
  margin-top: 20px;
  width: 40%;
  height: 35px;
  border: 2px solid #adff00;
  padding: 5px 0 5px 0;
  color: #adff00;
  font-weight: bold;
  background-color: #0d2f4e;
  border-radius: 5px;
}

.form-bouton-fermer {
  width: 45px;
  height: 45px;
  padding: 0;
  border: none;
  background: none;
  position:absolute; right:0;
  top:0;
  margin-top:0px;
  margin-right:0px;
}

</style>
