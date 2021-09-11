<template>
  <div class="col-xl" id="about-restaurant">
    <div class="row row-cols-1">
      <p class="display-4">{{ title }}</p>
      <img :src="getImgURL()" class="pb-4 float-start" alt="stock restaurant" />
      <p class="px-4 text-center">
        {{ info }}
      </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <TimeSheet v-for="i in dates" :key="i" :date="i" :times="i.times" />
    </div>
  </div>
</template>
<script>
import TimeSheet from "./TimeSheet.vue";

export default {
  components: {
    TimeSheet,
  },
  props: {
    title: {
      type: String,
      require: true,
    },
    info: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    images: {
      type: String,
      require: true,
      default: "@/assets/stock-restaurant.jpg",
    },
    id: {
      type: Number,
      require: true,
      default: 0,
    },
    dates: {
      type: Array,
      require: true,
    },
  },
  methods: {
    getImgURL() {
      return require("@/assets/" + this.img);
    },
    created() {},
  },
};
</script>
