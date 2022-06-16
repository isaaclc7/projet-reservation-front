<template>
  <div class="confirmation-reservation">
    <div>
      Merci pour votre réservation {{ reservation.utilisateur.prenom }} , Vous Jouerez sur le court {{ reservation.terrain.numero }}
    </div>
    <button @click="retourAcceuil()">Retour à l'acceuil</button>
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
  methods:{
   retourAcceuil(){
   this.$router.push('/'); 
      }
  }
};
</script>

<style>
.confirmation-reservation {
  height: 250px;
  width: 300px;
  background-color: #6994c5;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 50%;
  border-radius: 5px;
  border: 2px solid #adff00;
}

.confirmation-reservation div {
  color: #adff00;
  font-weight: bold;
  padding: 50px;
}

.confirmation-reservation button {
  height: 40px;
  width: 130px;
  margin: 0 auto;
  color: #adff00;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid #adff00;
  background-color: #0d2f4e;
}
</style>
