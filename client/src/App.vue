<template>
  <div>
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html">
            <img
              src="./assets/dropbear240.png"
              alt=""
              width="35"
              height="35"
              class="d-inline-block align-text-top"
            />
          </a>
          <router-link to="/" class="navbar-brand" href="index.html"
            ><i class="bi bi-geo-alt-fill"></i> DropBearTables</router-link
          >
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#reservation-modal"
                  data-bs-toggle="modal"
                  data-bs-target="#reservation-modal"
                  id="reservationsBtn"
                  @click="this.$store.state.reservationsShow = true"
                >
                  Reservations</a
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/graph">
                  Graph
                </router-link>
              </li>
            </ul>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="notificationsBtn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="this.$store.dispatch('notificationsToggle')"
              >
                Notifications
              </button>
              <ul
                class="dropdown-menu"
                v-bind:class="this.$store.state.notificationsShow"
                aria-labelledby="dropdownMenu2"
              >
                <div v-if="this.$store.state.notifications.length > 0">
                  <Notification
                    v-for="n in this.$store.state.notifications.length"
                    :key="n"
                    :num="n - 1"
                  />
                </div>
                <div v-else style="width: 400">No notifications</div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
    <Reservations v-if="this.$store.state.reservationsShow" />
    <BookingForm v-if="this.$store.state.bookingFormShow" />
    <UpdateForm v-if="this.$store.state.updateFormShow" />
  </div>
</template>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css";
@import "css/styles.css";
</style>

<script>
import Reservations from "@/components/Reservations.vue";
import BookingForm from "@/components/BookingForm.vue";
import UpdateForm from "@/components/UpdateForm.vue";
import Notification from "@/components/Notification.vue";

export default {
  components: {
    Reservations,
    BookingForm,
    UpdateForm,
    Notification,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("initRestaurants");
    this.$store.dispatch("initNotifications");
  },
};
</script>
