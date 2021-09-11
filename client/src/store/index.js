import { createStore } from 'vuex'

export default createStore({
  state: {
    restaurants: null,
    about: null,
    bookingForm: null,
    bookingFormShow: false,
    updateForm: null,
    updateFormShow: false,
    reservations: null,
    reservationsShow: false,
    errors: null

  },
  mutations: {
    setRestaurants(state, restaurants) {
      state.restaurants = restaurants
      state.about = restaurants[0]
    },
    setReservations(state, reservations) {
      state.reservations = reservations.all_reservations
    },
    updateAbout(state, payload) {
      state.bookingFormShow = false;
      state.restaurants.forEach(el => {
        if (el.id == payload.aboutID) {
          state.about = el
        }
      });
    },
    updateBookingForm(state, payload) {
      state.bookingForm = payload
      state.bookingFormShow = true
    },
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
          console.log(data)
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
          console.log(data)
          if (res.ok) {
            this.dispatch('getReservations')
          } else {
            data.errors.forEach(e => {
              state.errors = e.msg
            })
          }
        })
    },
    editReservation(state, payload) {
      let found = false
      state.reservations.forEach(r => {
        if (r._id == JSON.parse(payload)._id) {
          state.updateForm = r
          state.updateFormShow = true
          state.bookingFormShow = false
          found = true
        }
      })
      if (!found)
        console.log("Error: Cannot find reservation, cannot edit")
    },
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
          console.log(data)
          if (res.ok) {
            state.updateFormShow = false
            state.reservationsShow = true
            this.dispatch('getReservations')
          } else {
            data.errors.forEach(e => {
              state.errors = e.msg
            })
          }
        })
    },
    // Validates the form inputs
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
              // console.log(document.getElementById("first-name").value);
              // console.log(document.getElementById("phone-number").value);
              // console.log(document.getElementById("number-of-people").value);
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    }
  },
  actions: {
    initRestaurants({ commit }) {
      fetch('http://localhost:3000/restaurants')
        .then(res => res.json())
        .then(data => {
          commit('setRestaurants', data);
        }).catch(err => console.error(err))
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
    }
  },
  modules: {
  }
})
