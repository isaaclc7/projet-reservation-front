<template>
  <div>
    <h1>Court n°{{ terrain.numero }}</h1>
    <img src="@/assets/court-de-tennis.jpg" alt="Image du court de tennis" />
    <form class="formulaire" action="">
      <select v-model="horaire">
        <option disabled value="">Choisissez</option>
        <option v-for="disponibilite in disponibilites" :key="disponibilite.id">
          {{ disponibilite.dateDebut | date }}
        </option>
      </select>
      <input v-model="utilisateur.nom" type="text" placeholder="Nom" />
      <input v-model="utilisateur.prenom" type="text" placeholder="Prenom" />
      <input
        v-model="utilisateur.telephone"
        type="text"
        placeholder="N° Téléphone"
      />
      <button @click="reservation">TEST</button>
    </form>
  </div>
</template>

<script>
import { getTerrainById } from "../apis/terrains";
import { getDisponiblitesByTerrain } from "../apis/disponiblites";
import {
  getUtilisateurByTelephone,
  createUtilisateur,
} from "../apis/utilisateurs";
import { createReservation } from "../apis/reservation";
import { deleteDisponibiliteById } from "../apis/disponiblites";

export default {
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
      await createReservation(this.reservationCreer);
      deleteDisponibiliteById(horaire.id);
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
.formulaire {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
