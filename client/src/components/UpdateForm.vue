<template>
  <div class="modal-open" style="overflow: hidden; padding-right: 17px">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
      id="updateForm"
      tabindex="-1"
      aria-labelledby="updateFormLabel"
      style="display: block"
      aria-modal="true"
      role="diaglo"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateFormLabel">
              Update {{ getDate(this.$store.state.updateForm.date_reserved) }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="this.$store.state.updateFormShow = false"
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
                    :value="this.$store.state.updateForm.name"
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
                    :value="this.$store.state.updateForm.contact.phone_number"
                  />
                  <div class="invalid-feedback">* Required!</div>
                </div>
                <div class="mb-3">
                  <label for="number-of-people" class="col-form-label"
                    >Number of People</label
                  >
                  <select class="form-control" id="number-of-people" required>
                    <option label="Choose..."></option>
                    <option
                      v-for="i in 15"
                      :key="i"
                      :ivalue="1"
                      :selected="i == this.$store.state.updateForm.seats"
                    >
                      {{ i }}
                    </option>
                    <!-- <option value="2" selected>2</option>
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
                    <option value="15">15</option> -->
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
                    :value="this.$store.state.updateForm.special"
                  ></textarea>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="this.$store.state.updateFormShow = false"
              >
                Close
              </button>
              <button
                type="button"
                data-bs-target="#updateForm"
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
      let time = this.$store.state.updateForm[0];
      let date = this.$store.state.updateForm[1];
      nam, num, ppl, spc, time, date;

      if (this.validate(nam, num, time, date) == 1) {
        let payload = JSON.stringify({
          _id: this.$store.state.updateForm._id,
          restaurant: this.$store.state.updateForm.restaurant,
          name: nam,
          phone_number: num,
          seats: ppl,
          time: time,
          date_reserved: date,
        });
        this.$store.dispatch("updateReservation", payload);
      }
    },
    validate(nam, num, time, date) {
      nam, num, time, date;
      return 1;
    },
    getDate(date) {
      let d = new Date(date);
      let format =
        d.getDay() +
        "/" +
        d.getMonth() +
        "/" +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes();
      format = d.toDateString();
      return format;
    },
  },
};
</script>