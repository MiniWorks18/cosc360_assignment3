<template>
  <div id="browse">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <h1>Restaurants</h1>
          <div
            class="alert collapse alert-success"
            id="newReservation"
            role="alert"
            aria-expanded="false"
            aria-controls="newReservation"
          >
            New Reservation Complete!
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl">
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <Restaurant
              v-for="i in this.$store.state.restaurants"
              :key="i"
              :title="i.title"
              :info="i.info"
              :img="i.img"
              :id="i.id"
            />
          </div>
          <AboutRestaurant
            v-if="this.$store.state.about.length != 0"
            :img="this.$store.state.about.img"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Restaurant from "../components/Restaurant.vue";
import AboutRestaurant from "../components/AboutRestaurant.vue";
export default {
  components: {
    Restaurant,
    AboutRestaurant,
  },
  created() {
    document.title = "DBT - Browse";
  },
};
</script>
