<template>
  <div class="carte-terrain">
    <img
      class="carte-terrain__image"
      src="@/assets/court-de-tennis.jpg"
      alt="Image du court de tennis"
    />
    <div class="carte-terrain__nom">Court n°{{ numero }}</div>
  </div>
</template>

<script>
export default {
  props: {
    numero: String,
  },
};
</script>

<style scoped>
.carte-terrain {
  display: flex;
  flex-direction: column;
  width: 250px;
  border: 3px solid white;
  border-radius: 5px;
}

.carte-terrain__image {
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0 0;
}

.carte-terrain__nom {
  border-top: 3px solid white;
  padding: 5px 0 5px 0;
  color: #adff00;
  font-weight: bold;
}
</style>
