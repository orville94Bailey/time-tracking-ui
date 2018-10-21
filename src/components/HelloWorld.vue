<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-if="!this.userLoggedIn">
      <input v-model="username" placeholder="Name" type="text"/>
      <input v-model="password" placeholder="password" type="password"/>
      <button v-on:click="authenticateUser" title="Log In">Log In</button>
    <br>
    </div>
    <span v-if="this.userLoggedIn">Your name is {{this.$store.getters.name}}, you're a {{this.$store.getters.profession}}.</span>
    <button v-if="this.userLoggedIn" v-on:click="logOut">Log Out</button>
    <br>
    <span v-if="this.errorState">{{this.errorMessage}}</span>
    <AddTimeEvent v-if="this.userLoggedIn"/>
    <TimeEvents v-if="this.userLoggedIn"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  import AddTimeEvent from './AddTimeEvent.vue'
  import TimeEvents from './TimeEvents.vue'

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
      },
      logOut : function() {
        this.$store.dispatch({type:'logoutUser'})
      }
    },
    components: {
      AddTimeEvent,
      TimeEvents
    },
    computed: {
      ...mapState([
          'userLoggedIn',
          'errorState',
          'errorMessage'
        ])
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
