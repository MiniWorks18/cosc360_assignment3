import { createStore } from 'vuex'

export default createStore({
  // Global variables across the client
  state: {
    restaurants: null,
    about: "",
    bookingForm: null,
    bookingFormShow: false,
    updateForm: null,
    updateFormShow: false,
    reservations: null,
    reservationsShow: false,
    errors: null,
    notificationsShow: "",
    notifications: [],
    isFetching: true

  },
  // Mutation functions for dynamic web-interface
  mutations: {
    // Simple fetch request, then update data
    setRestaurants(state) {
      fetch('http://localhost:3000/restaurants')
        .then(async res => await res.json())
        .then(data => {
          state.about = data[0]
          state.restaurants = data
          state.isFetching = false
        }).catch(err => console.error(err))

    },
    // Update reservation data after a fetch
    setReservations(state, reservations) {
      state.reservations = reservations.all_reservations
    },
    // Allows dynamic changing of the about tile on the website
    updateAbout(state, payload) {
      state.bookingFormShow = false;
      state.restaurants.forEach(el => {
        if (el.id == payload.aboutID) {
          state.about = el
        }
      });
    },
    // Fill in booking form details
    updateBookingForm(state, payload) {
      state.bookingForm = payload
      state.bookingFormShow = true
    },
    // Post a new reservation to the database
    newReservation(state, payload) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: payload
      }
      fetch('http://localhost:3000/reservations/', requestOptions)
        .then(async res => {
          const data = await res.json()
          // console.log(data)
          if (res.ok) {
            this.dispatch('getReservations')
            state.bookingFormShow = false
            state.reservationsShow = true
          } else {
            data.errors.forEach(e => {
              state.errors = e.msg
            })
          }

        })
        .catch(err => console.error("Error", err))
    },
    // Delete a new reservation from the database
    removeReservation(state, payload) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: payload
      }
      fetch('http://localhost:3000/reservations/', requestOptions)
        .then(async res => {
          const data = await res.json()
          // console.log(data)
          if (res.ok) {
            this.dispatch('getReservations')
          } else {
            data.errors.forEach(e => {
              state.errors = e.msg
            })
          }
        })
    },
    // Fill edit form with details from reservation
    editReservation(state, payload) {
      let found = false
      state.reservations.forEach(r => {
        if (r._id == JSON.parse(payload)._id) {
          state.updateForm = r
          state.updateFormShow = true
          state.bookingFormShow = false
          state.reservationsShow = false
          found = true
        }
      })
      if (!found)
        console.log("Error: Cannot find reservation, cannot edit")
    },
    // Put the updates into the reservation on the database
    updateReservation(state, payload) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: payload
      }
      fetch('http://localhost:3000/reservations/', requestOptions)
        .then(async res => {
          const data = await res.json()
          // console.log(data)
          if (res.ok) {
            state.updateFormShow = false
            state.bookingFormShow = false
            state.reservationsShow = true
            this.dispatch('getReservations')
          } else {
            data.errors.forEach(e => {
              state.errors = e.msg
            })
          }
        })
    },
    // Validates the form inputs (not used properly)
    validate() {
      "use strict";

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    // Toggles the notification dropdown
    notificationsToggle(state) {
      // console.log("toggle")
      if (state.notificationsShow == "show") {
        state.notificationsShow = ""
      } else {
        state.notificationsShow = "show"
      }
    },
    // Connects to the database via EventSource to get live notifications
    notificationEvents(state) {
      const url = 'http://localhost:3000/reservations/notification'
      const sse = new EventSource(url)
      /* To listen to the named event "stockAdded" */
      sse.addEventListener("reservationAdded", (e) => {
        state.notifications.push(JSON.parse(e.data))
      })
      sse.addEventListener("message", (e) => {
        console.log('MESSAGE')
        console.log(e.data)
      })
      sse.addEventListener("rUpdate", () => {
        this.dispatch('getReservations')
      })
    }
  },
  actions: {
    initRestaurants({ commit }) {
      commit('setRestaurants');
    },
    getReservations({ commit }) {
      fetch('http://localhost:3000/reservations')
        .then(res => res.json())
        .then(data => {
          commit('setReservations', data);
        }).catch(err => console.error(err))
    },
    updateAbout({ commit }, payload) {
      commit('updateAbout', payload)
    },
    updateBookingForm({ commit }, payload) {
      commit('updateBookingForm', payload)
    },
    newReservation({ commit }, payload) {
      commit('newReservation', payload)
    },
    removeReservation({ commit }, payload) {
      commit('removeReservation', payload)

    },
    editReservation({ commit }, payload) {
      commit('editReservation', payload)
    },
    updateReservation({ commit }, payload) {
      commit('updateReservation', payload)
    },
    validate({ commit }) {
      commit('validate')
    },
    notificationsToggle({ commit }) {
      commit('notificationsToggle')
    },
    initNotifications({ commit }) {
      commit('notificationEvents')
    }
  },
  modules: {
  }
})
