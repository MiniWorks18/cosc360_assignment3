<template>
  <div class="modal-open" style="overflow: hidden; padding-right: 17px">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
      id="reservation-modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      style="display: block"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Reservations</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="this.$store.state.reservationsShow = false"
            ></button>
          </div>
          <div class="modal-body">
            <table
              class="table table-striped table-hover"
              id="reservations-table"
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Restaurant</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">Seats</th>
                </tr>
              </thead>
              <tbody id="reserve-tbody">
                <tr v-for="i in this.$store.state.reservations" :key="i">
                  <td>
                    <button
                      class="btn btn-outline-danger removebtn"
                      type="button"
                      aria-expanded="false"
                      aria-controls="removed"
                      @click="remove(i._id)"
                    >
                      <i class="bi bi-x-circle" />
                    </button>
                    |
                    <button
                      class="btn btn-outline-success"
                      type="button"
                      @click="edit(i._id)"
                    >
                      <i class="bi bi-pencil-square" />
                    </button>
                  </td>
                  <td>{{ i.restaurant }}</td>
                  <td>{{ i.name }}</td>
                  <td>
                    {{ getDate(i.date_reserved) }}
                  </td>
                  <td>{{ i.seats }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="this.$store.state.reservationsShow = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("getReservations");
  },
  methods: {
    remove(id) {
      let payload = JSON.stringify({
        _id: id,
      });
      this.$store.dispatch("removeReservation", payload);
    },
    edit(id) {
      let payload = JSON.stringify({
        _id: id,
      });
      this.$store.dispatch("editReservation", payload);
    },
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