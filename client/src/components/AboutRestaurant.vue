<template>
  <div class="col-xl" id="about-restaurant">
    <div class="row row-cols-1">
      <p class="display-4">Boost Restaurant</p>
      <img
        src="../assets/stock-restaurant.jpg"
        class="pb-4 float-start"
        alt="stock restaurant"
      />
      <p class="px-4 text-center">
        More about this interesting restaurant that serves food to people who
        are hungry and could eat food at the specific time they choose to.
        Alternatively the food may be half eaten and taken home for the customer
        to eat at a later date.
      </p>
    </div>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <TimeSheet />
    </div>
  </div>
</template>
<script>
import TimeSheet from "./TimeSheet.vue";

export default {
  components: {
    TimeSheet,
  },
};
</script>
