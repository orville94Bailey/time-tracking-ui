import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import axios from 'axios'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
   key: 'timeKeeper',
   storage: window.localStorage
})

const store = new Vuex.Store({
   state: {
      user: {
         id:'',
         name:'',
         profession:''
      },
      timeEvents: [],
      apiUrl: 'http://localhost:8081',
      errorState: false,
      errorMessage: '',
      userLoggedIn: false
   },
   getters: {
      name: state => state.user.name,
      profession: state=>state.user.profession,
      id: state=>state.user.id,
      apiUrl: state=>state.apiUrl,
      errorState: state=>state.errorState,
      errorMessage: state=>state.errorMessage,
      timeEvents: state=>state.timeEvents,
      userLoggedIn: state=>state.userLoggedIn
   },
   mutations: {
      addUser(state, packedObject) {
        state.user = packedObject.user
        state.userLoggedIn = true
      },

      removeUser(state) {
        state.user = null
        state.userLoggedIn = false
      },

      loginError(state, packedObject){
        state.errorState = true;
        state.errorMessage = packedObject.message
      },

      resetLoginError(state){ 
        state.errorState = false;
        state.errorMessage = '';
      },

      addTimeEvent(state, packedObject) {
        state.timeEvents.push(packedObject.timeEvent)
      },

      addTimeEvents(state, packedObject) {
        state.timeEvent.concat(packedObject.timeEvents)
      }
   },
   actions: {
      authenticateUserAsync({commit, state}, loginInfo) {
        axios.post('http://localhost:8081/authenticate',
          {username:loginInfo.providedUsername, password:loginInfo.providedPassword})
            .then(function (response) {
              if (response.data.success) {
                if(store.getters.errorState){
                  store.commit({type:'resetLoginError'})
                }
                store.commit({type:'addUser', user:{id:response.data._id, name:response.data.name, profession:response.data.profession}})
              } else {
                store.commit({type:'loginError', message:response.data.message})
                store.commit({type:'removeUser'})
              }
            })
            .catch(function(err) {
              console.error(err)
            })
      },

      getUsersEvents({commit, state}){
        axios.get('http://localhost:8081/userEvents', {id:store.getters.id})
          .then(function (response) {
            if(response) {
              store.commit({type:'addTimeEvents', timeEvents:response.body})
            } else {
              //no data?
            }
          })
          .catch(function(err) {
            console.log(err)
          })
      }, 

      addTimeEvent({commit, state}, packedObject) {
        var timeObject = {user:packedObject.userId, time:packedObject.time, event:packedObject.event}
        axios.post('http://localhost:8081/timeEvent', timeObject)
          .then(function (response) {
            if(response) {
              store.commit({type:'addTimeEvent', timeEvent:{timeObject}})
            } else {
              console.log('could not post time event')
            }
          })
          .catch(function (err) {
            console.log(err)
          })

      }
   },
   plugins: [vuexLocalStorage.plugin]
})

export default store;