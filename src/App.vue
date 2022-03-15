<template>
  <v-app>
     <div>
        <v-app-bar app v-if="this.inicio.estado==false" class="white "  elevate-on-scroll  > 
        <v-btn   href="/" class="m-0 p-0" text large>
         <v-img   max-height="50"   max-width="90"  
        src="https://i.ibb.co/thnsYtk/logo-ccexpress.png" class="px-0 py-0 m-0"> </v-img> 
        </v-btn> 
      <v-spacer></v-spacer> 
      <div class="d-flex">
        <v-btn    outlined color="red"    type="submit"   @click="loguin"  class="mx-1 text-capitalize " >
          Ingresar
        </v-btn> 
        <v-btn outlined    dark color="green accent-4"  @click="eliminarid"  class="mx-1 text-capitalize" >
         Explorar 
        </v-btn>
      </div>

        </v-app-bar>
      
     </div>
    <Header v-if="this.inicio.estado==true"></Header>




     <v-dialog
          v-model="loading.estado"
          hide-overlay
          persistent
          width="300"
          >
          <v-card
            color="primary"
            dark
          >
          <v-card-text>
              {{loading.titulo}}
              <v-progress-linear
                indeterminate
                color="white"
                class="mb-0"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
        <Snackbar></Snackbar>
    <v-main class="mt-0 ">
        <Inicio v-if="this.inicio.estado==false"></Inicio> 

      <router-view/>
    </v-main>

    <Footer></Footer>
  </v-app>
</template>

<script>
import { mapState} from "vuex"
import Header from './components/shared/Header.vue'
import Footer from './components/shared/Footer.vue'
import Snackbar from './components/shared/Snackbar.vue'
import Inicio from './components/Inicio.vue'

export default {
  name: 'App',
  components:{
    Header,
    Footer,
    Snackbar,
    Inicio,

  },

  data: () => ({
    mostrar: false,
    ruta:''


  }),
  computed:{
    ...mapState(["loading",'isloading','userLocation','inicio','btneditarp']),
    val(){
      this.inicio.estado = false;
    },
 
  },
  methods:{
    // async eli(){

    // },
            eliminarid(){
      this.btneditarp.estado=true
       let id= JSON.parse(localStorage.getItem('id'));
       if(id !=null){ 
        localStorage.removeItem('id');
         this.$router.push('Home'); 
      }else{
         this.$router.push('Home'); 
      } 
    }, 
    loguin(){ 
      this.$router.push('Loguin') 
      

    },
  },
 
  
  created(){
    this.inicio.estado=false;
    console.log(this.btneditarp.estado);
    // console.log(this.isloading, this.userLocation)
  }
};
</script>
<style >
.fontp{
  font-family: 'Coming Soon', cursive;
}
</style>