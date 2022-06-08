<template>
  <div class="carte-terrain">
    <img src="@/assets/court-de-tennis.jpg" alt="" />
    <div class="carte-terrain__nom">Court n°{{ nom }}</div>
  </div>
</template>

<script>
export default {
  props: {
    nom: String,
  },
};
</script>
