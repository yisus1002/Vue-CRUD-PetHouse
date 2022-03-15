<template >
    <div>  
            <v-row >
                <v-col cols="6" sm="4" md="6" lg="12" xl="12" v-for="n in masco" :key="n.id">
                    <v-card   class="d-xl-flex  p-2 rounded"  >
                  <v-img  :src="n.imagen+'/'+n.id"  max-width="200"   class=" mx-auto"  >                    <template v-slot:placeholder>
                      <v-row  class="fill-height ma-0"  align="center"  justify="center" >
                        <v-progress-circular  indeterminate  color="green lighten-1" ></v-progress-circular>
                      </v-row>
                    </template>
                   </v-img> 
                   <div class="container-fluid px-0"  > 
                      <v-card-subtitle class="d-flex justify-space-between px-0 px-sm-0 px-md-2"  >
                         <v-chip  class="" color="red"
                                    text-color="white"  
                                    >
                            {{ n.tipo_mascota}}
                           </v-chip>  
                           <div   class="mx-0 d-flex justify-space-between">
                                   <v-btn icon small class="mx- " @click="color!=color" >
                                       <v-icon dark :id="'corazon'+n.id " :color="colores">mdi-heart</v-icon>
                                     </v-btn>

                                     <v-btn icon plain small class="mx-"   >
                                       <v-icon>mdi-dots-vertical</v-icon>
                                     </v-btn>
                           </div>
                      </v-card-subtitle>
                       <v-card-title   class="py-2">
                                        {{n.titulo}}
                       </v-card-title>

                        <v-card-text>
                              <v-icon color="green">mdi-google-maps</v-icon>{{n.ubicacion}}
                        </v-card-text> 
                   </div> 
                    </v-card> 
                </v-col>
            </v-row> 
    </div>
</template>
<script>
import axios from "axios";

export default {
    name:"Card",
    data: () => ({
      show: false,
        masco:[],
        attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
            },
            color:false,
            colores:'',
    }),methods:{
    async getMascotas(){
        try{ 
            const datos=await axios.get('https://61d654c7b7381600171814db.mockapi.io/mascota/');         
            this.masco= datos.data;
          console.log(this.masco)
      
        }catch(error){
            console.log(error);
        
        }
    }
    },
   
    created(){
        this.getMascotas();
    }

    
}
</script>
<style lang="">
    
</style>