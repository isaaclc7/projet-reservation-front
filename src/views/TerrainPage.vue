<template>
  <div class="container">
    <c-header />
    <div class="trait-separation"></div>
    <p class="en-tete">Réserver votre terrain</p>
    <div class="trait-separation"></div>
    <div class="terrain-reservable">
      <img
        class="carte-terrain-image"
        src="@/assets/court-de-tennis.jpg"
        alt="Image du court de tennis"
      />
      <div class="terrain-info">
        <h1 class="terain-numero">Court n°{{ terrain.numero }}</h1>
        <button class="boutton-supprimer" @click="openForm">
          <img src="@/assets/supprimer.svg" alt="Supprimer un terrain" />
        </button>
        <div class="supprimer-confirmation" v-if="isOpen">
          <p>Voulez vous supprimer le terrain ?</p>
          <button @click="supprimerTerrain">Oui</button>
          <button @click="openForm">Non</button>
        </div>
      </div>
    </div>
    <div class="form-terrain">
      <form class="formulaire" action="">
        <select class="form-select" v-model="horaire">
          <option disabled value="">Choisissez</option>
          <option
            v-for="disponibilite in disponibilites"
            :key="disponibilite.id"
          >
            {{ disponibilite.dateDebut | date }}
          </option>
        </select>
        <input
          class="form-input"
          v-model="utilisateur.nom"
          type="text"
          placeholder="Nom"
        />
        <input
          class="form-input"
          v-model="utilisateur.prenom"
          type="text"
          placeholder="Prenom"
        />
        <input
          class="form-input"
          v-model="utilisateur.telephone"
          type="text"
          placeholder="N° Téléphone"
        />
        <button class="form-reserver-terrain" @click="reservation">
          Réserver
        </button>
      </form>
    </div>
    <c-footer />
  </div>
</template>

<script>
import CHeader from "../components/CHeader.vue";
import CFooter from "../components/CFooter.vue";
import { getTerrainById, deleteTerrain } from "../apis/terrains";
import { getDisponiblitesByTerrain } from "../apis/disponiblites";
import {
  getUtilisateurByTelephone,
  createUtilisateur,
} from "../apis/utilisateurs";
import { createReservation } from "../apis/reservation";
import { deleteDisponibiliteById } from "../apis/disponiblites";
import { ACCUEIL } from "../router/names";

export default {
  components: {
    CHeader,
    CFooter,
  },
  data() {
    return {
      terrain: {},
      disponibilites: [],
      horaire: "",
      utilisateur: {
        nom: "",
        prenom: "",
        telephone: "",
      },
      reservationCreer: {
        dateReservation: "",
        terrain: {},
        utilisateur: {},
      },
      isOpen: false,
    };
  },
  methods: {
    choixHoraire() {
      let horaireChoisi = {};
      this.disponibilites.forEach((disponibilite) => {
        if (
          this.$options.filters.date(disponibilite.dateDebut) == this.horaire
        ) {
          horaireChoisi = disponibilite;
          console.log(JSON.stringify(disponibilite));
        }
      });
      return horaireChoisi;
    },
    async enregistrementUtilisateur() {
      const utilisateurAlreadyExists = await getUtilisateurByTelephone(
        this.utilisateur.telephone
      );
      console.log(utilisateurAlreadyExists);
      if (utilisateurAlreadyExists === "") {
        const utilisateurCreated = await createUtilisateur(this.utilisateur);
        console.log(
          "CREATION UTILISATEUR: " + JSON.stringify(this.utilisateur)
        );
        return utilisateurCreated;
      } else {
        console.log(
          "RECUPERATION UTILISATEUR: " +
            JSON.stringify(utilisateurAlreadyExists)
        );
        return utilisateurAlreadyExists;
      }
    },
    async reservation() {
      const horaire = this.choixHoraire();
      this.reservationCreer.dateReservation = horaire.dateDebut;
      this.reservationCreer.terrain = this.terrain;
      this.reservationCreer.utilisateur =
        await this.enregistrementUtilisateur();
      const reservationEnregistree = await createReservation(
        this.reservationCreer
      );
      console.log("RESERVATION FAITE");
      console.log(JSON.stringify(reservationEnregistree));
      this.$router.push({
        path: `/reservation/${reservationEnregistree.id}`,
      });
      deleteDisponibiliteById(horaire.id);
    },
    openForm() {
      if (this.isOpen == true) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    async supprimerTerrain() {
      console.log("SUPPRIMER");
      await deleteTerrain(this.$route.params.id);
      this.$router.push({ name: ACCUEIL });
    },
  },
  async mounted() {
    this.terrain = await getTerrainById(this.$route.params.id);
    this.disponibilites = await getDisponiblitesByTerrain(
      this.$route.params.id
    );
  },
  filters: {
    date(valeur) {
      return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "medium",
      }).format(new Date(valeur));
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.form-terrain {
  width: 300px;
  height: 300px;
  background-color: #6994c5;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 10px;
}
.formulaire {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.form-input {
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

.form-select {
  height: 42px;
  width: 82%;
  border: 2px solid #adff00;
  border-radius: 5px;
  background-color: #0d2f4e;
  color: #adff00;
  font-weight: bold;
  text-align: center;
  text-emphasis-color: #adff00;
  margin-top: 30px;
}

.form-reserver-terrain {
  margin-top: 10px;
  width: 40%;
  height: 35px;
  border: 2px solid #adff00;
  padding: 5px 0 5px 0;
  color: #adff00;
  font-weight: bold;
  background-color: #0d2f4e;
  border-radius: 5px;
}

.terrain-reservable {
  width: 300px;
  height: 340px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 30px;
}

.carte-terrain-image {
  border: 3px solid white;
  border-radius: 5px;
}

.terain-numero {
  color: #adff00;
}

.terrain-info {
  background-color: #6994c5;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.boutton-supprimer {
  background-color: #0d2f4e;
  border-radius: 5px;
  border: 2px solid #adff00;
  width: 55px;
  height: 55px;
}

.supprimer-confirmation {
  border: 3px solid #adff00;
  background-color: #0d2f4e;
  width: 300px;
  height: 160px;
  position: fixed;
  top: 40%;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.supprimer-confirmation p {
  color: #adff00;
  font-weight: bold;
}
.supprimer-confirmation button {
  margin: 0 auto;
  margin-top: 10px;
  width: 40%;
  height: 35px;
  border: 2px solid #adff00;
  padding: 5px 0 5px 0;
  color: #adff00;
  font-weight: bold;
  background-color: #6994c5;
  border-radius: 5px;
}

@media screen and (min-width: 640px) {
  .terrain-resevable {
    width: 500px;
    height: 340px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
