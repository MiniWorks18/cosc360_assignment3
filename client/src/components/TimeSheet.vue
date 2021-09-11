<template>
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ date[0] }}</h5>
        <TimeButton v-for="i in date[1]" :key="i" :time="i" :day="date[0]" />
        <!-- <button
          v-for="i in times"
          :key="i"
          type="button"
          class="btn btn-primary btn-sm m-1"
          data-bs-toggle="modal"
          data-bs-target="#reservationModal"
          data-bs-whatever="@getbootstrap"
          onclick="printTime(30)"
        >
          Hi
        </button> -->
      </div>
    </div>
  </div>
</template>
<script>
import TimeButton from "./TimeButton.vue";
export default {
  props: {
    date: {
      type: String,
      require: true,
    },
    times: {
      type: Array,
      require: true,
    },
  },
  components: {
    TimeButton,
  },
  methods: {},
};
</script>
