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
    errors: null,
    notificationsShow: "",
    notifications: [{ "msg": "Successfully created reservation", "item": { "_id": "613d6379aeb6f800465a36f0", "restaurant": "subway", "name": "Steveee", "date_reserved": "2021-09-10T00:00:00.000Z", "seats": 3, "contact": { "phone_number": "0499999990" }, "client_id": "613d6379aeb6f800465a36f1", "date_created": "2021-09-12T02:18:33.296Z", "__v": 0 } }]

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
          state.reservationsShow = false
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
    },
    notificationsToggle(state) {
      console.log("toggle")
      if (state.notificationsShow == "show") {
        state.notificationsShow = ""
      } else {
        state.notificationsShow = "show"
      }
    },
    notificationEvents(state) {
      const url = 'http://localhost:3000/reservations/notification'
      const sse = new EventSource(url)
      /* To listen to the named event "stockAdded" */
      sse.addEventListener("reservationAdded", (e) => {
        state.notifications.push(JSON.parse(e.data))
        console.log('reservationAdded')
        console.log(e.data)
        // write your own code to render the data in the UI component(s) when you
        // ...
      })
      /* The event "message" is a special case when the event does not have an
      event field. It does not handle the case of `event: message`, as the event
      has a event field. Listening to "message" event is equivalent to using the
      onmessage property <https://developer.mozilla.org/enUS/docs/Web/API/EventSource/onmessage>*/
      sse.addEventListener("message", (e) => {
        console.log('MESSAGE')
        console.log(e.data)
      })
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
