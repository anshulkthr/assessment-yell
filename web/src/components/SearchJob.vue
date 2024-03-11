<template>
  <div class="form-group">
    <h1>Search the jobs by username</h1>
    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>
    <select class="user-list" v-model="selectedOption" @change="onChange($event)" v-if="options.length > 0" >
        <option disabled selected value="choose">Choose</option>
        <option v-for="option in options" :value="option.value" :key="option.value">{{ option.text }}</option>
    </select>
    <jobList :result=jobResult />
  </div>
</template>

<script>
import axios from 'axios';
import jobList from './JobList.vue';

export default {
  name: 'SearchJob',
  components: {
    jobList
  },
  mounted() {
    this.populate();
  },
  data () {
    return {
      selectedOption: 'choose',
      options: [],
      jobResult: {},
      errorMsg: ''
    }
  },
  methods: {
    populate() {
      axios.get('http://localhost:3001/businesses/')
        .then((response) => {
          response.data.businesses.forEach(user => {
            this.options.push({
              text: user.username,
              value: user.id
            });
          })
        })
        .catch((error) => {
          this.errorMsg = error;
        });
    },

    onChange(event) {
      const selectUserId = event.target.value;

      axios.get(`http://localhost:3001/businesses/${selectUserId}/jobs`)
        .then((response) => {
          this.jobResult = { ...response.data };
        })
        .catch((error) => {
          this.errorMsg = error;
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  select.user-list {
    max-width: 200px;
    height: 30px;
    width: 100%;
  }
  .error {
    color: red;
  }
</style>
