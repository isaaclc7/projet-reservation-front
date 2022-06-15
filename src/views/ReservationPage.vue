<template>
  <div>
    <div>Merci pour votre réservation</div>
    <div>{{ reservation.terrain.numero }}</div>
    <div>{{ reservation.utilisateur.nom }}</div>
    <div>{{ reservation.utilisateur.prenom }}</div>
    <div>{{ reservation.utilisateur.telephone }}</div>
  </div>
</template>

<script>
import { ACCUEIL } from "../router/names";
import { getReservationById } from "../apis/reservation";

export default {
  data() {
    return {
      reservation: {},
      accueilRoute: ACCUEIL,
    };
  },
  async mounted() {
    this.reservation = await getReservationById(this.$route.params.id);
  },
};
</script>
