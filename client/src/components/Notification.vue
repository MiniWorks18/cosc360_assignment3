<template>
  <div id="notificationsDropdown">
    <hr v-if="num > 0" />
    <div
      class=""
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style="width: 400px"
    >
      <div class="toast-header">
        <strong class="me-auto">Reservations</strong>
        <small class="text-muted">11 mins ago</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="this.$store.state.notifications.splice(num, 1)"
        ></button>
      </div>
      <div class="toast-body">
        {{ this.$store.state.notifications[num].msg }} on
        {{ getDate(this.$store.state.notifications[num].item.date_reserved) }}
        at
        {{ this.$store.state.notifications[num].item.restaurant }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
    },
  },
  methods: {
    //   Gets proper date formatting
    getDate(date) {
      let d = new Date(date);
      let format =
        d.getDate() +
        "/" +
        d.getMonth() +
        "/" +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();
      return format;
    },
  },
};
</script>