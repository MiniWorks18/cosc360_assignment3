<template>
  <div class="col-xl" id="about-restaurant">
    <div class="row row-cols-1">
      <p class="display-4">{{ this.$store.state.about.title }}</p>
      <img :src="getImgURL()" class="pb-4 float-start" alt="stock restaurant" />
      <p class="px-4 text-center">
        {{ this.$store.state.about.info }}
      </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <TimeSheet
        v-for="i in this.$store.state.about.dates"
        :key="i"
        :date="i"
        :times="i.times"
      />
    </div>
  </div>
</template>
<script>
import TimeSheet from "./TimeSheet.vue";

export default {
  components: {
    TimeSheet,
  },
  methods: {
    getImgURL() {
      return require("@/assets/" + this.$store.state.about.img);
    },
  },
};
</script>
