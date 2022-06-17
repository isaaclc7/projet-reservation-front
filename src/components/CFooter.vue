<template>
  <div class="footer">
    <button @click="lienInstagram" class="footer__bouton">
      <img src="../assets/insta.svg" alt="Instagram" />
    </button>
    <button @click="retourAcceuil" class="footer__bouton">
      <img src="../assets/accueil.svg" alt="Accueil" />
    </button>
    <button @click="lienFacebook" class="footer__bouton">
      <img src="../assets/facebook.svg" alt="Facebook" />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    lienInstagram() {
      window.open("https://www.instagram.com/tclillois_lm/?hl=fr", "_blank");
    },
    lienFacebook() {
      window.open("https://www.facebook.com/T.C.LILLE", "_blank");
    },
    retourAcceuil() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: #6994c5;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
}

.footer__bouton {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
</style>
