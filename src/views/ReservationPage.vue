<template>
  <div class="container">
    <c-header />
    <div class="trait-separation"></div>
    <p class="en-tete">
      Confirmation <br />
      de réservation !
    </p>
    <div class="trait-separation"></div>
    <div class="confirmation-reservation">
      <div class="confirmation-reservation__texte">
        Merci pour votre réservation {{ reservation.utilisateur.prenom }}. Vous
        pourrez accèder au court n°{{ reservation.terrain.numero }} le
        {{ reservation.dateReservation | dateJour }} à partir de
        {{ reservation.dateReservation | dateHeure }} pour une durée d'une heure
      </div>
      <button class="confirmation-reservation__bouton" @click="retourAcceuil">
        Retour à l'accueil
      </button>
    </div>
    <c-footer />
  </div>
</template>

<script>
import CHeader from "../components/CHeader.vue";
import CFooter from "../components/CFooter.vue";
import { ACCUEIL } from "../router/names";
import { getReservationById } from "../apis/reservation";

export default {
  components: {
    CHeader,
    CFooter,
  },
  data() {
    return {
      reservation: {},
      accueilRoute: ACCUEIL,
    };
  },
  async mounted() {
    this.reservation = await getReservationById(this.$route.params.id);
  },
  methods: {
    retourAcceuil() {
      this.$router.push("/");
    },
  },
  filters: {
    dateJour(valeur) {
      return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
      }).format(new Date(valeur));
    },
    dateHeure(valeur) {
      return new Intl.DateTimeFormat("fr-FR", {
        timeStyle: "medium",
      }).format(new Date(valeur));
    },
  },
};
</script>

<style>
.container {
  height: 100vh;
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

.confirmation-reservation {
  width: 300px;
  background-color: #6994c5;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 30%;
  border-radius: 5px;
  border: 2px solid #adff00;
}

.confirmation-reservation__texte {
  color: #adff00;
  font-weight: bold;
  padding: 50px;
}

.confirmation-reservation__bouton {
  height: 40px;
  width: 130px;
  margin: 0 auto;
  margin-bottom: 15px;
  color: #adff00;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid #adff00;
  background-color: #0d2f4e;
}
</style>
