<template>
   <table>
      <tr>
        <th>Time</th>
        <th>Event</th>
      </tr>
   </table>
</template>

<script>
export default {
   name: 'TimeEvents',
   data () {
      return {
        times: []
      }
   },
   methods: {

   }
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

