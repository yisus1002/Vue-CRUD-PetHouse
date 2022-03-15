<template >
 <div>
   <!-- Menu lateral -->
    <v-navigation-drawer
       :permanent="menuinicio.estado"  fixed width="200"  expand-on-hover class="hidden-sm-and-down  my-16"
        style="height:100vh;  z-index: 1; " v-model="menuinicio.estado"  >
       <v-list nav dense>
      <v-list-item-group active-class="blue--text grey lighten-5" class="mt-6  " style="margin-bottom:24vh;"> 
           
            <v-list-item link :to="item.to"  v-for="item of itemInicio" :key="item.icon"   >
                        <v-list-item-icon>
                        <v-icon color="teal accent-3" >{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item>  

      </v-list-item-group> 
       </v-list> 
  </v-navigation-drawer>

<!-- Header -->
    <v-app-bar  app elevate-on-scroll height="45" > 
        <v-app-bar-nav-icon  color="red" class="hidden-md-and-up" @click="ham=true"></v-app-bar-nav-icon>
        <v-img   lazy-src="https://i.ibb.co/1LjY2dP/logo.png"  max-height="35"   max-width="90"  
        src="https://i.ibb.co/thnsYtk/logo-ccexpress.png" dark class="mr-3 my-auto ml-md-4  "> </v-img>  
        <v-spacer></v-spacer>
        <Avatar></Avatar>
        <tema/>
        <template v-slot:extension >
          <v-tabs  
              show-arrows  id="cont" 
           color="cyan"
            >
               <v-tabs-slider color="green accent-3"></v-tabs-slider>
              <!--  -->
           <v-tab  :to="item.to"  v-for="item of items" :key="item.title"
             class="hidden-sm-and-down mx-0 font-weight-bold text-capitalize">  
            {{item.title}}
                  <!-- <v-icon size="26" color="teal darken-2" >{{item.icon}}</v-icon> -->
            </v-tab>
            <!--  -->
             <v-tab  :to="item.to"  v-for="item of  itemInicio" :key="item.to"
              class="hidden-md-and-up   mx-0" > 
                  <v-icon  color="teal darken-2 " size="23" >{{item.icon}}</v-icon>
            </v-tab>
             
             
           
         </v-tabs>
        </template>
      </v-app-bar>

<!-- Menu del header -->
 <!-- src="https://cadenaser00.epimg.net/ser/imagenes/2021/04/20/ciencia/1618942837_702489_1618942926_noticia_normal.jpg" -->
 <!-- teal text-darken-1 -->
 <v-navigation-drawer 
    
    v-model="ham" temporary  class=" hidden-md-and-up "
      dark fixed  height="100vh"  >
          <v-list nav dense class="pb-8" >
              <v-list-item-group active-class="blue--text grey lighten-5" >
                            
                    <v-list-item-title> 
                     <h6  class=" text-center fontJ text-xs-h1 py-0 my-0 mb-3" >
                         <v-icon size="25" color="white" >mdi-paw</v-icon>
                         petHouse
                         <v-icon  size="25" color="white">mdi-paw</v-icon>
                       </h6>
                    </v-list-item-title>

                    <v-divider></v-divider>
                    <v-list-item link :to="item.to"  v-for="item in items" :key="item.title"   >
                        <v-list-item-icon>
                        <v-icon >{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item>  

                    <v-divider></v-divider> 
              </v-list-item-group>
          </v-list>
            <h3 class="text-center  text-j" style="position: absolute; bottom:0; ">PetHouse</h3>
    </v-navigation-drawer>

    </div>
</template>
<script>

import { mapState } from "vuex"
import Tema from "../shared/Tema.vue"
import Avatar from '../shared/Avatar.vue'
export default {
    name:'Header',
    data(){
        return {
            ham:false,

            items: [
                  { title: 'Inicio', icon: 'mdi-home', to:'/Home' },
                  { title: 'Nosotros', icon: 'mdi-account-group', to:'/nosotros' },
                  { title: 'Contactanos', icon: 'mdi-contacts', to:'/contactanos'},
                  { title: 'Preguntas', icon: 'mdi-chat-question-outline', to:'/preguntas' },
                  ],
            itemInicio:[
              {title: 'Mascotas', icon:'mdi-paw', to:'/mascotas'},
              {title: 'Productos', icon:'mdi-shopping', to:'/productos'},
              {title: 'Clientes', icon:'mdi-human-queue', to:'/clientes'},
              {title: 'Proveedores', icon:'mdi-handshake', to:'/proveedor'},
            ]
        }
    },
    components:{
      Tema,
      Avatar,
    }
    ,
    computed:{
    
     ...mapState(['menuinicio']),
          
    },
    methods: {

    },
    mounted() {
    },
    created(){
    }
    
}
</script>
<style scoped >
    .text-j{
      background-color:rgba(51, 49, 49, 0.322);
      padding: 3px;
      color: white;
      font-size: 15px;
      width: 100%;
      overflow: hidden;
    }
    #cont{
      display: flex;
      justify-content: center;
    }
</style>
