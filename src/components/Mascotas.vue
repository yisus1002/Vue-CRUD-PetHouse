<template >
    <div>
    <v-container fluid class="pl-md-14 d-flex justify-center " >
      <v-container  class=" px-0 pb-0" >
       <div class=" container-fluid mt-0 mx-auto col-sm-12 col-md-11 pt-0 px-0 white shadow rounded-lg" style="overflow:hidden;" >
            <h1 class=" justify-center fontp d-flex m-0 py-0 green" >Mascotas <v-icon color="purple accent-3" class="mx-3" size="34">mdi-paw</v-icon> </h1>
                 <v-btn color="purple accent-3" 
                 class="mx-4 mb-3 my-1"
                     @click="limpiar " 
                  x-small elevation="5" fab  dark> <v-icon>mdi-plus</v-icon></v-btn>    
          <div class="container-fluid table-responsive cont-table">
            <table  class="table table-sm table-hover " >
              <thead>               
                <tr id="CabezeraC">
                  <th scope="col" >fila</th> 
                  <th class="text-center" scope="col">Tipo de mascota</th>
                  <th class="text-center" scope="col">Imagen</th>
                  <th class="text-center" scope="col">Ubicacion</th>
                  <th class="text-center" scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody id="insertardM">
                   <tr class="text-start" :id="'row'+index" v-for="(item, index) of mascota" :key="index"  >
                        <td scope="row"> <v-container class=" justify-center d-flex" >  {{index + 1}}   </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.tipo_mascota}}      </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.imagen}}            </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.ubicacion}}         </v-container></td>
                        <td class=" m-0 p-0">
                            <v-container class="d-flex justify-center">
                                <v-btn color="red"  plain icon @click="modif(item.id, index)"    >  <v-icon small >mdi-pencil</v-icon> </v-btn>
                                <v-btn color="blue" plain icon @click="eliminarMascota(item.id)" >  <v-icon small >mdi-delete</v-icon> </v-btn>
                            </v-container>
                        </td>
                    </tr>
              </tbody>
            </table>

          </div>
        </div>

        <v-dialog v-model="dialog" width="500"  persistent>
            <v-card>
                <v-card-title class="text-center"> {{tituloForm}}</v-card-title>

                <v-form class="p-4"> 
                  <v-combobox   prepend-icon="mdi-paw"   required
                    v-model="masco.tipo_mascota"
                    :items="items_mascota"
                    label="Seleccione una mascota" 
                  ></v-combobox>
                   <v-file-input  v-model="masco.imagen"  placeholder="Suba una imagen"  
                                chips  multiple show-size
                                prepend-icon="mdi-camera" label="Suba una imagen">
                    </v-file-input>
                    
                  <v-text-field label="Ubicacion" prepend-icon='mdi-home'   v-model="masco.ubicacion" required  ></v-text-field>
                  
                   <v-card-actions class="justify-center"> 
                   <v-btn  color="green"           v-if="!bhabilitar"      @click.prevent="modificarMascota" dark    type="submit">Editar</v-btn>
                   <v-btn  color="purple accent-3" v-if="bhabilitar"   @click.prevent="crearMascota" dark    type="submit">guardar</v-btn>
                    <v-btn color="red"  dark @click=" dialog=false" >cancelar</v-btn>
                </v-card-actions>
                </v-form> 
            </v-card>
        </v-dialog>
        
      </v-container>
     </v-container>
    
    </div>
</template>
<script>

import axios from "axios";
import { mapState,  mapMutations } from "vuex"


export default {
    name:'Mascotas',
    data(){
        return {
      imagen:'dfgdfg',
            api:'https://61d654c7b7381600171814db.mockapi.io/mascota/',
            id:'',
            i:'',
            bhabilitar:'',
            dialog: false,
            mascota:[],
            masco:{  tipo_mascota:'', imagen:[''], ubicacion:''  },
            tituloForm:'',
               items_mascota: ['Perro', 'Gato'],
              //  files: [],
        }
    },
    computed:{
 ...mapState(['menuinicio','inicio']),
    },
    methods:{
      
       ...mapMutations(["mostrarLoading","ocultarLoading", 'mostrarSnacbar']),
        limpiar(){
            this.dialog=true;
            this.bhabilitar=true;
            this.tituloForm='Agregar mascota';
            this.masco.tipo_mascota='';
            this.masco.imagen=[];
            this.masco.ubicacion='';
          },

        async getMascotas(){
        try{
            this.mostrarLoading({titulo:"Cargando",color:"secondary"})
            const datos=await axios.get(this.api);
            this.mascota= datos.data;
        
        }catch(error){
            console.log(error);
        
        }
        finally{
            this.ocultarLoading()
        }
        },

        async crearMascota(){
            if(this.masco.tipo_mascota==='' || this.masco.imagen===[]||
                this.masco.ubicacion===''){
            this.mostrarSnacbar({mensaje: 'Faltan datos!',
                                   color:'red'});
            }else{
            
            let img=(this.masco.imagen);

            let mascota={
                tipo_mascota:this.masco.tipo_mascota,
                imagen:img[0].name,
                ubicacion:this.masco.ubicacion,
            }
            try{
                const response = await axios.post(this.api,mascota);
                console.log(response.data)
                this.mostrarSnacbar({mensaje: response.data.tipo_mascota +' Se ha agregado',
                                    color:'green'});
                this.getMascotas();
            
            }catch(error){
                console.log(error);
            }finally{
                this.dialog=false;
            }
            }
        },
        modif(id,index){
            this.i=index;
            this.id=id;
            this.bhabilitar=false;
            this.dialog=true;
            this.tituloForm='Modificar mascota'
            this.masco.tipo_mascota=this.mascota[index].tipo_mascota;
            this.masco.ubicacion=this.mascota[index].ubicacion;
            this.masco.imagen=[];
        },
        async modificarMascota(){
           let img=(this.masco.imagen);

           if(img.length==0){
             img='';
             img=this.mascota[this.i].imagen;
           }else{
             img=img[0].name
           }
           console.log(img);
           let mascota={
                tipo_mascota:this.masco.tipo_mascota,
                 imagen:img,
                ubicacion:this.masco.ubicacion,
            }
            try{     
                const response = await axios.put((this.api+this.id),mascota);
                console.log("mascota modificada: ",response.data)
                 this.mostrarSnacbar({mensaje: response.data.tipo_mascota+ ' Se ha modificado' ,
                                    color:'light-blue accent-3'});
             
                this.getMascotas();
            }catch(error){
                console.log(error)
            }finally{
                this.dialog=false;
            }
        },
        async eliminarMascota(id){
            const response = await axios.delete((this.api+id));
            console.log("cliente eliminado: ",response.data)
                 this.mostrarSnacbar({mensaje: response.data.tipo_mascota+ ' Se eliminado!' ,
                                    color:'orange darken-1'});
         
            this. getMascotas();
        },

    },
    created(){
      this.menuinicio.estado=true;
       this.inicio.estado=true;
      this.getMascotas();

    },
}
</script>
<style scoped> 
</style>