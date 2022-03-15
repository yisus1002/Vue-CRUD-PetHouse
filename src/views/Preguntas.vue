<template >
    <div>
        <v-container fluid class="p-0"  >
<v-parallax dark  src="https://oxygen4fun.supadezign.com/wp-content/uploads/2019/12/mountains.jpg" height="300" >
    <v-row  align="center"  justify="center"  >
      <v-col class="text-center"  cols="12" >
        <!-- <h1 class="text-h4 font-weight-thin mb-4">
          Vuetify
        </h1> -->
         <!-- color="transparent" -->
        <!-- <v-toolbar -->
      <!-- flat -->
     
    <!-- > -->
      <!-- <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn> -->
    <!-- </v-toolbar> -->
            <h4 class="subheading my-0 py-0">
          Soluciona tus dudas!
        </h4>
    <v-container  >
        <v-row class="d-flex mx-0 my-1 justify-center" >
            <v-col cols="12" sm="10" md="7" lg="7" xl="5">
                     <v-text-field 
     
         prepend-inner-icon="mdi-magnify"
        label="Buscar"
        single-line 
        solo
        rounded
        clearable
        hide-details 
      ></v-text-field>
            </v-col>
        </v-row>

    </v-container>



      </v-col>
    </v-row>
  </v-parallax>
   

            <v-row align="center"  justify="center" class=" mx-0 py-4">
              <v-col class="text-center px-0 mx-0"  cols="12"  >
                <h1 class="text-h5 font-weight-medium text-uppercase cyan--text  my-4">
                  Categorías
                </h1> 
                <v-container>
                <v-row class="d-flex mx-0 my-1 justify-center" >
                    <v-col cols="12" sm="6" md="4"  v-for="n of categoria " :key="n.id" class=" align-items-center  ">
                        <v-btn color="teal accent-1"   outlined class="   btnp shadow container rounded-circle  " style="height:130px; width:130px;  ">
                            <v-icon size="60">{{n.icon}}</v-icon>

                        </v-btn>
                              <v-card-text class="text-center text-uppercase body-1 font-weight-regular col-6 mx-auto hover ">
                             {{n.titulo}}
                              </v-card-text>   
                    </v-col> 
                </v-row>                     
                </v-container>  
              </v-col>
            </v-row>
        </v-container>
 
    
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    
    name:'Preguntas',
    data(){
        return{
            categoria:[
                {titulo:'¿qué es pethouse?', icon:'mdi-paw' },
                {titulo:'Manejo de pagina web', icon:'mdi-laptop' },
                {titulo:'Adopción', icon:'mdi-dog' },
                {titulo:'Donación', icon:'mdi-cash-100' },
                {titulo:'Alianzas', icon:'mdi-handshake-outline' },
                {titulo:'recursos legales', icon:'mdi-note-text-outline' },

            ],
        }
    },
  computed:{
 ...mapState(['menuinicio','inicio']),
    },
     created(){
      this.menuinicio.estado=false;
       this.inicio.estado=true;

    },
}

</script>
<style scoped>
.btnp{
    /* border:0.1px solid rgba(133, 125, 125, 0.405); */
    background-color: rgba(250, 241, 241, 0.111);
}
/* .btnp:hover{
    background-color:rgba(22, 255, 69, 0.22);
} */
.hover:hover{
     transform: scale(1.2);
    transition: all ease .5s;
} 
</style>