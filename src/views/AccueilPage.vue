<template>
  <div class="container">
    <c-header />
    <div class="trait-separation"></div>
    <p class="en-tete">
      Louez votre terrain où vous voulez quand vous voulez !
    </p>
    <div class="trait-separation"></div>
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
        <input
          class="form-nombre-terrain"
          v-model="terrain.numero"
          type="text"
          placeholder="N° terrain"
        />
        <button class="form-enregistrer-terrain" @click="creerTerrain">
          Enregistrer
        </button>
      </form>
      <button v-if="isOpen" class="form-bouton-fermer" @click="closeForm">
        <img src="@/assets/fermer.svg" alt="Fermer le formulaire" />
      </button>
    </div>
    <button class="bouton-ajout" @click="openForm">
      <img src="@/assets/ajout-terrain.svg" alt="Ajouter un terrain" />
    </button>
    <c-footer />
  </div>
</template>

<script>
import CHeader from "../components/CHeader.vue";
import CFooter from "../components/CFooter.vue";
import { TERRAIN } from "../router/names";
import CarteTerrain from "../components/CarteTerrain.vue";

import { getAllTerrains, createTerrain } from "../apis/terrains";

export default {
  components: {
    CarteTerrain,
    CHeader,
    CFooter,
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
      this.isOpen = false;
    },
    async creerTerrain() {
      // const terrainAlreadyExists = await getTerrainByNumero(
      //   this.terrain.numero
      // );
      // console.log(JSON.stringify(terrainAlreadyExists));
      // if (this.isEmpty(terrainAlreadyExists)) {
      //   await createTerrain(this.terrain);
      //   console.log("CREE");
      //   // this.$router.go();
      // } else {
      //   console.log("PAS CREE");
      // }
      await createTerrain(this.terrain);
      this.$router.go();
    },
    isEmpty(someObject) {
      return !Object.keys(someObject).length;
    },
  },
  async mounted() {
    this.getTerrains();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
}

.trait-separation {
  border-top: 1px solid #adff00;
  width: 174px;
}

.en-tete {
  color: #7d8a9e;
  font-size: 26px;
  margin: 15px 0 15px 0;
}

.liste__terrains {
  display: flex;
  flex-direction: column;
  gap: 25px;
  list-style: none;
  align-content: center;
  padding: 0;
  margin-top: 30px;
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
  top: 83%;
  left: 81.5%;
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
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 0px;
  margin-right: 0px;
}

@media screen and (min-width: 1024px) {
  .liste__terrains {
    display: grid;
    grid-template-columns: repeat(2,1fr);
}
}
</style>
