import Vue from 'vue'
import Vuex from 'vuex'

import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isloading:true,
    userLocation:[],
    respuesta:[],
    menuinicio:{
      estado:false,
    },
    btneditarp:{estado:false},
    
    loading:{
      titulo:"",
      estado:false,
      color:"primary"
    },
    snackbar:{
      estado:false,
      mensaje:'',
      color:'',
    },
    usuario:{id:''},
    inicio:{estado:false},

  },
    mutations:{
      mostrarLoading(state,payload){
        state.loading.titulo= payload.titulo;
        state.loading.color=payload.color
        state.loading.estado=true;
      },
      ocultarLoading(state){
        state.loading.estado=false;
      },
      mostrarSnacbar(state,payload){
        state.snackbar.mensaje=payload.mensaje;
        state.snackbar.color=payload.color;
        state.snackbar.estado=true;
      },
      setLngLat(state , coords){
        console.log({coords});
        state.userLocation=coords;
        state.isloading=false;
      },
      async obtenerUsuarios(state ){
          try{
              const datos=await axios.get('https://61d654c7b7381600171814db.mockapi.io/cliente/');
              state.respuesta=datos.data;
          
          }catch(error){
              console.log(error);
          }   
      }
      },
  actions: {
    getInitialLocalitation({commit}){
      navigator.geolocation.getCurrentPosition(
        ( {coords} ) => commit('setlngLat',coords),
        ( err ) =>{
          console.log(err);
          throw new Error('No geolocation');
        }
      );
    }
  },
  modules: {
  },

})
