<template>
  <div id="bookingForm" class="modal-open">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
      id="reservationModal"
      tabindex="-1"
      aria-labelledby="reservationModalLabel"
      style="display: block"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reservationModalLabel">
              Reserve {{ this.$store.state.bookingForm[0] }} on
              {{ this.$store.state.bookingForm[1] }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="this.$store.state.bookingFormShow = false"
            ></button>
          </div>
          <div class="modal-body">
            <div
              v-if="this.$store.state.errors != null"
              class="alert alert-danger"
            >
              {{ this.$store.state.errors }}
            </div>
            <form class="needs-validation" id="reservation-form" novalidate>
              <div class="form-group">
                <div class="mb-3">
                  <label for="first-name" class="col-form-label"
                    >First Name:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="first-name"
                    required
                    value="stevee"
                  />
                  <div class="invalid-feedback">* Required!</div>
                </div>
                <div class="mb-3">
                  <label for="phone-number" class="col-form-label"
                    >Phone Number:</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    id="phone-number"
                    required
                    value="0499999990"
                  />
                  <div class="invalid-feedback">* Required!</div>
                </div>
                <div class="mb-3">
                  <label for="number-of-people" class="col-form-label"
                    >Number of People</label
                  >
                  <select class="form-control" id="number-of-people" required>
                    <option label="Choose..."></option>
                    <option value="1">1</option>
                    <option value="2" selected>2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                  </select>
                  <div class="invalid-feedback">* Required!</div>
                </div>
                <div class="mb-3">
                  <label for="special-requests" class="col-form-label"
                    >Special Requests</label
                  >
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    id="special-requests"
                  ></textarea>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="this.$store.state.bookingFormShow = false"
              >
                Close
              </button>
              <button
                type="button"
                id="bookingFormSave"
                data-bs-target="#reservationModal"
                class="btn btn-primary"
                @click="submit()"
              >
                Finish
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    submit() {
      let nam = document.getElementById("first-name").value;
      let num = document.getElementById("phone-number").value;
      let ppl = document.getElementById("number-of-people").value;
      let spc = document.getElementById("special-requests").value;
      let time = this.$store.state.bookingForm[0];
      let date = this.$store.state.bookingForm[1];
      nam, num, ppl, spc, time, date;

      if (this.validate(nam, num, time, date) == 1) {
        let payload = JSON.stringify({
          restaurant: this.$store.state.about.title,
          name: nam,
          phone_number: num,
          seats: ppl,
          time: date + time,
          date_reserved: date,
          special_requests: spc,
        });
        this.$store.dispatch("newReservation", payload);
      }
    },
    validate(nam, num, time, date) {
      nam, num, time, date;
      return 1;
    },
  },
};
</script>