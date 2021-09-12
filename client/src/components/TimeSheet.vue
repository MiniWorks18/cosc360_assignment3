<template>
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ date[0] }}</h5>
        <TimeButton v-for="i in date[1]" :key="i" :time="i" :day="date[0]" />
      </div>
    </div>
  </div>
</template>
<script>
import TimeButton from "./TimeButton.vue";
export default {
  props: {
    date: {
      type: Array,
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
