<template>
    <div class="job-list-container" v-if="result?.jobs">
      <h3 class="user-display-name" v-if="result.display_name">Name: {{ result.display_name }}</h3>
      <div class="row">
        <div class="column" v-for="job in result.jobs" :key="job.id">
            <div class="location">{{ job.location }}</div>
            <h3>{{ job.headline }}</h3>
            <div class="classification">{{ job.classification }}</div>
            <div class="description">{{ job.description }}</div>
            <div class="date-added">{{ formatDate(job.date_added) }}</div>
        </div>
      </div>
    </div>
    <h3 v-else-if="result.display_name && !result.jobs">There is no any job listing with {{ result.display_name }}</h3>
  </template>
  
  <script>
  export default {
    name: 'JobList',
    props: {
      result: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    methods: {
      formatDate(date) {
        let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear(),
          hours = d.getHours(),
          minutes = d.getMinutes(),
          ampm = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-') + " " + strTime;
      }
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .job-list-container {
      margin-top: 30px;
    }
    .row {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 30px;
    }
    .column {
      position: relative;
      text-align: left;
      width: 50%;
      padding: 10px;
      border: 1px solid #b2b2b2;
      border-radius: 3px;
      padding: 15px;
      box-shadow: 0 0 10px 0 #ccc;
      margin-bottom: 25px;
    }
    .row:after {
      content: "";
      display: table;
      clear: both;
    }
    .location {
      font-size: 13px;
      background-color: green;
      max-width: 90px;
      border-radius: 5px;
      padding: 5px 10px;
      color: #fff;
      font-weight: 500;
    }
    .classification {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px 10px;
      background: #e74d3d;
      color: #fff;
    }
    .date-added {
      text-align: right;
      font-size: 13px;
      font-weight: 600;
      margin-top: 10px;
    }

    @media only screen and (max-width: 768px) {
      .column {
        width: 100%;
      }
    }
  </style>
  