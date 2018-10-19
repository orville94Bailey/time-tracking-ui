<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="!this.$store.getters.userLoggedIn">
      <input v-model="username" placeholder="Name" type="text"/>
      <input v-model="password" placeholder="password" type="password"/>
      <button v-on:click="authenticateUser" title="Log In">Log In</button>
    <br>
    </div>
    <span v-if="this.$store.getters.id !== ''">Your name is {{this.$store.getters.name}}, you're a {{this.$store.getters.profession}}, and your id is {{this.$store.getters.id}}.</span>
    <br>
    <span v-if="this.$store.getters.errorState">{{this.$store.getters.errorMessage}}</span>
    <AddTimeEvent v-if="this.$store.getters.userLoggedIn"/>
  </div>
</template>

<script>
import axios from 'axios'
import AddTimeEvent from './AddTimeEvent.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username:'',
      password:''
    }
  },
  methods: {
    authenticateUser : function() {
      this.$store.dispatch('authenticateUserAsync',{providedUsername:this.username,providedPassword:this.password})
    }
  },
  components: {
    AddTimeEvent,
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
