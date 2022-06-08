<template>
  <div>
    <h1>PAGE TERRAIN</h1>
    <button @click="test">TEST</button>
  </div>
</template>

<script>
import { getTerrainById } from "../apis/terrains";

export default {
  data() {
    return {
      terrain: {},
    };
  },
  methods: {
    test() {
      console.log(this.terrain);
      console.log(this.$route.params.id);
    },
  },
  async mounted() {
    this.terrain = await getTerrainById(this.$route.params.id);
  },
};
</script>
