<template >
    <div> 
       <v-container fluid  class="p-0" > 
            <v-row  align="center"  justify="center" class=" mx-0 py-4">
              <v-col class="text-center px-0 mx-0"  cols="12"  >
                <h1 class="text-h4 font-weight-thin  cyan--text  my-4">
                  Nuestro equipo
                </h1> 
                <v-row class="d-flex mx-0 my-1 justify-center" >
                    <v-col cols="12" md="4"  v-for="n of equipo " :key="n.id" class=" align-items-center  ">
                        <v-img  aspect-ratio="1" 
                        :src="n.img"  class="rounded-circle shadow-lg mx-auto col-3  col-md-3 hover" > 
                        </v-img>
                              <v-card-text class="text-center subtitle-2 col-6 mx-auto ">
                              {{n.nombre}}
                              </v-card-text>   
                    </v-col> 
                </v-row>   
              </v-col>
              <v-col class="text-center px-auto pl-sm-10 pr-sm-1"  cols="10" sm="5"  md="4" lg="3"  xl="2">
                 <v-btn rounded link color="teal accent-1 "  href="tel:3042740404" block 
                    height="auto" class="d-flex align-center text-capitalize"  style="overflow:hidden;">
                    <v-icon size="30" color="cyan darken-4">mdi-phone</v-icon>
                    <v-card-text class="p-2  green--text font-weight-medium">
                      Llamanos <span class="text-lowercase ">ahora</span><br>
                      +3042740404
                    </v-card-text>
                </v-btn>
              </v-col>
              <v-col class="text-center px-auto pr-sm-10 pl-sm-1"  cols="10" sm="5"  md="4" lg="3"  xl="2">
                 <v-btn rounded   color="teal accent-1 "    block   @click="sheet = !sheet"
                    height="auto" class="d-flex align-center text-capitalize"  style="overflow:hidden;">
                    <v-icon size="30" color="cyan darken-4">mdi-email</v-icon>
                    <v-card-text class="p-2 py-5  green--text font-weight-medium" >
                      Escribenos  
                    </v-card-text>
                </v-btn>
              </v-col> 
            </v-row> 
          <v-bottom-sheet v-model="sheet" >
               <v-sheet     height="auto"   >
                 <v-row  class="m-0 p-0  justify-end">
                   <v-btn  class="my-2 mx-4"    small icon  text   @click="sheet = !sheet"  >
                    <v-icon  color="red">mdi-close</v-icon>
                   </v-btn>
                 </v-row> 
                 <div class="py-3 text-center d-flex" >
                     <v-form  ref="form"   class=" p-4  shadow rounded-xl m-auto"   > 
                        <h3 class="text-center fontp">Complete el formulario</h3>
                            <v-text-field  solo   label="Ingrese su nombre"  required  rounded >
                            </v-text-field>   
                            <v-text-field solo    label="Ingrese su E-mail"  required   rounded >
                            </v-text-field> 
                            <v-text-field  solo     type="tel"    label="Ingrese su Telefono"  required rounded >
                            </v-text-field>
                            <v-textarea   height="90" no-resize solo rounded name="input-7-4"   label="Escribe una descripcion de su requerimiennto, le responderemos pronto" required >
                            </v-textarea>
                        <v-container class="d-flex justify-center "  > 
                           <v-btn rounded  block   color="cyan lighten-4" class=" text-capitalize "   >
                              <v-icon color="success">mdi-send</v-icon>
                            </v-btn>  
                        </v-container>
                     </v-form>
                 </div>
               </v-sheet>
          </v-bottom-sheet> 
       </v-container>
    </div>
</template>
<script>
import { mapState } from "vuex" 
export default {
    name:'Contactanos',
    data(){ return{
        sheet: false,
        equipo:[
            {nombre: 'Jesus David Garcia Hernandez', img:'https://i.ibb.co/QJ1RmGN/pp.jpg'},
            {nombre: 'Roberto Carlos Berrocal Rodriguez', img:'https://i.ibb.co/42qFjtX/Whats-App-Image-2022-02-16-at-10-38-20-PM.jpg'},
            ] 
    }},
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
        .hover:hover{
      transform: scale(1.1);
    transition: all ease .5s;
    }
</style>