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
      default: "../assets/",
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="col">
    <div class="card">
      <img :src="images + img" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ info }}
        </p>
        <a
          href="#about-restaurant"
          onclick="viewRestaurant('boost')"
          class="btn btn-primary"
          >Check availability</a
        >
      </div>
    </div>
  </div>
</template>