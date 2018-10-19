<template>
   <div>
      Date: <input :value="date && date.toISOString().split('T')[0]" type="date" @input="date = $event.target.valueAsDate"/>
      Time: <input v-model="hour" type="number" maxlength="2"/> <input v-model="minute" type="number" maxlength="2">
      <select v-model="selected">
         <option diabled value="">Select One</option>
         <option v-for="(event, index) in events" :key="index">{{event}}</option>
      </select>
      <button v-on:click="saveDate" >Save Date</button>
   </div>
</template>

<script>
export default {
   name:'AddTimeEvent',
   data() {
      return {
         date:new Date(),
         hour: 12,
         minute: 0,
         events: ['In', 'Out', 'Break'],
         selected:''
      }
   },
   methods: {
      toDoubleDigitValue( value ) {
         return String('00' + value).slice(-2);
      },
      getTime() {
         return this.date.toISOString().split('T')[0].replace(/-/g,'') + this.toDoubleDigitValue(this.hour) + this.toDoubleDigitValue(this.minute) + this.toDoubleDigitValue('');
      },
      printDate() {
         console.log(this.getTime())
         console.log(this.date)
         console.log(this.date.toISOString())
      },
      saveDate() {
         this.$store.dispatch({type:'addTimeEvent', userId:this.$store.getters.id, time:this.getTime(), event:this.selected});
      },
   },
}
</script>

<style scoped>

</style>
