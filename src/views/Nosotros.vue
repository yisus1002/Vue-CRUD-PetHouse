<template >
   <div>
     <v-container fluid  class=" d-flex align-items-center " >
       <v-row class=" "   >
         <v-col cols="12" sm="12"  class="p-0 m-0 mx-xl-auto" >
                <v-card class="d-flex m-0" elevation="0">
                    <v-img :src="img"   aspect-ratio="112" height="560"    class="d-flex align-items-center " > 
                            <v-row class="d-flex justify-center justify-sm-end   px-4 " > 
                                   <v-col cols="10" sm="6" md="5" xl="3" class="transpa rounded-xl shadow  " >
                                      <span class="white--text subheading  h5 text-lg-h4  "  >
                                       {{text}} 
                                    </span> 
                                </v-col>
                            </v-row> 
                    </v-img> 
                </v-card>
         </v-col> 
<v-parallax dark  src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"  height="auto" > 
           <v-row class="  my-0  mx-0"> 
             <v-container  class="px-0 my-0">
               <v-row class="d-flex  my-1 justify-center">
                <h2 class="text-center fontp ">¡Generamos valor de verdad!</h2>
                <v-col cols="12" md="4"  v-for="n of informacion " :key="n.id" class="d-flex flex-column align-items-center  hover"   > 
                   <v-card-title  class=" fontp">{{n.titulo}}</v-card-title>   
                      <v-card-text class="text-center display-3 ">
                       {{n.cifra}}
                         </v-card-text>   
                   <v-icon  :color="n.color" size="60">{{n.icono}}</v-icon> 
                    </v-col>
                   </v-row>
               </v-container> 
           </v-row>
</v-parallax> 
       </v-row>
     </v-container> 
   </div>
</template>
<script>
import { mapState } from "vuex"




export default {
    name:'Nosotros',
    data(){
        return {
          text:'Somos una organización en busca de hogares para mascotas en estado de calle',
          informacion:[
            { titulo:'Adoptados',  cifra:'+ 30 mil',icono:'mdi-home' ,color:'blue' },
            { titulo:'Rescatados',  cifra:'+ 50 mil',icono:'mdi-hand-heart' ,color:'red' },
            { titulo:'Encontrados',  cifra:'+ 10 mil',icono:'mdi-paw' ,color:'green' },
            ],
          img:'https://tvazteca.brightspotcdn.com/dims4/default/78b5548/2147483647/strip/true/crop/1079x777+0+0/resize/968x697!/format/jpg/quality/80/?url=https%3A%2F%2Ftvazteca.brightspotcdn.com%2F9a%2Fd2%2F2b50c8004ee09eafcea66a6d17a8%2Fperrita-fotos-familiares.jpg'
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
    .transpa{
      background-color:rgba(143, 135, 135, 0.344);
    }
    .hover:hover{
      transform: scale(1.1);
    transition: all ease .5s;
    }
</style>