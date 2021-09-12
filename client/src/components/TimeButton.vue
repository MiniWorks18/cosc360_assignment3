<template>
  <button
    type="button"
    class="time-button btn btn-primary btn-sm m-1"
    data-bs-toggle="modal"
    data-bs-target="#reservationModal"
    data-bs-whatever="@getbootstrap"
    href="#reservationModal"
    @click="updateBookingForm(time, day)"
  >
    {{ time }}
  </button>
</template>
<script>
export default {
  props: {
    key: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    day: {
      type: String,
      require: true,
    },
  },
  methods: {
    updateBookingForm(time, day) {
      let payload = [time, day];
      this.$store.dispatch("updateBookingForm", payload);
    },
  },
};
</script>