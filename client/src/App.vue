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
                id="dropdownMenu2"
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
                <li>
                  <a
                    href=""
                    aria-current="page"
                    data-bs-toggle="modal"
                    data-bs-target="#reservation-modal"
                    class="dropdown-item nav-link h2 p-4"
                    >New reservation made</a
                  >
                </li>
                <li>
                  <a
                    href=""
                    aria-current="page"
                    data-bs-toggle="modal"
                    data-bs-target="#reservation-modal"
                    class="dropdown-item nav-link h2 p-4"
                    >New reservation made</a
                  >
                </li>
                <li>
                  <a
                    href=""
                    aria-current="page"
                    data-bs-toggle="modal"
                    data-bs-target="#reservation-modal"
                    class="dropdown-item nav-link h2 p-4"
                    >Reservation canceled</a
                  >
                </li>
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
    <div
      aria-live="polite"
      aria-atomic="true"
      style="position: relative; min-height: 200px"
    >
      <div class="toast" style="position: absolute; top: 0; right: 0">
        <div class="toast-header">
          <strong class="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button
            type="button"
            class="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">Hello, world! This is a toast message.</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css";
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css";
@import "css/styles.css";

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>

<script>
import Reservations from "@/components/Reservations.vue";
import BookingForm from "@/components/BookingForm.vue";
import UpdateForm from "@/components/UpdateForm.vue";

export default {
  components: {
    Reservations,
    BookingForm,
    UpdateForm,
  },
  data() {
    return {};
  },
  methods: {
    showModal() {},
  },
  created() {
    this.$store.dispatch("initRestaurants");
  },
};
</script>
