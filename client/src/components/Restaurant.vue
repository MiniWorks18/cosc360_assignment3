<script>
export default {
  name: "Restaurant",
  components: {},
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
    },
    id: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  methods: {
    updateAbout() {
      let payload = {
        aboutID: this.id,
      };
      this.$store.dispatch("updateAbout", payload);
    },
    getImgURL() {
      return require("@/assets/" + this.img);
    },
  },
};
</script>
<template>
  <div class="col">
    <div class="card">
      <img :src="getImgURL()" class="card-img-top" alt="Restaurant image" />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ info }}
        </p>
        <a
          href="#about-restaurant"
          @click="updateAbout()"
          class="btn btn-primary"
          >Check availability</a
        >
      </div>
    </div>
  </div>
</template>