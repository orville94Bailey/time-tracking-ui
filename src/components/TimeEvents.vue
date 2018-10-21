<template>
   <table>
      <tr>
        <th>Time</th>
        <th>Event</th>
      </tr>
      <tr v-for="(event, index) in timeEvents" :key="index">
        <td>{{timeEvents[index].timeObject.time}}</td>
        <td>{{timeEvents[index].timeObject.event}}</td>
      </tr>
   </table>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'TimeEvents',
    data () {  
        return {

        }
    },
    methods: {

    },
    created() {
      this.$store.dispatch({type:'getUsersEvents'})
    },
    computed: {
      ...mapState([
        'timeEvents'
      ])  
    },
  }
</script>

<style scoped>
  table {
     font-family: Arial, Helvetica, sans-serif;
     border-collapse: collapse;
     width: 100%
  }

  td, th {
     border: 1px solid #dddddd;
     text-align: left;
     padding:8px;
  }

  tr:nth-child(even) {
     background-color: #dddddd;
  }
</style>

