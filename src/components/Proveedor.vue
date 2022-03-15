<template >
    <div>
    <v-container fluid class="pl-md-14 d-flex justify-center " >
      <v-container  class=" px-0 pb-0" >
          <div class=" container-fluid mt-0 mx-auto col-sm-12 col-md-11 pt-0 px-0 shadow  white rounded-lg" style="overflow:hidden;">
               <h1 class=" justify-center fontp d-flex m-0 py-0 green" >Proveedor <v-icon color="purple accent-3 " class="mx-3" size="34">mdi-handshake</v-icon> </h1>
                 <v-btn color="purple accent-3" 
                 class="mx-4 mb-3 mt-1"
                     @click="limpiar " 
                  x-small elevation="5" fab  dark> <v-icon>mdi-plus</v-icon></v-btn>    
          <div class="container-fluid table-responsive cont-table">
            <table class="table table-sm table-hover " >
              <thead>
                
                <tr id="CabezeraPrd">
                  <th scope="col" >fila</th> 
                  <th class="text-center" scope="col">Nombre</th>
                  <th class="text-center" scope="col">Direccion</th>
                  <th class="text-center" scope="col">Telefono</th>
                  <th class="text-center" scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody id="insertardC">
                   <tr class="text-start" :id="'row'+index" v-for="(item, index) of  proveedor" :key="index"  >
                        <td scope="row"> <v-container class=" justify-center d-flex" >  {{index + 1}}   </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.nombre}}           </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.direccion}}         </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.telefono}}             </v-container></td>
                        <td class=" m-0 p-0">
                            <v-container class="d-flex justify-center">
                                <v-btn color="red"  plain icon @click="modif(item.num_registro, index)"    >  <v-icon small >mdi-pencil</v-icon> </v-btn>
                                <v-btn color="blue" plain icon @click="eliminarProveedor(item.num_registro)" >  <v-icon small >mdi-delete</v-icon> </v-btn>
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
                  <v-text-field label="Nombre"     prepend-icon="mdi-account-circle" v-model="proveed.nombre" required  ></v-text-field>
                  <v-text-field label="Direccion"  prepend-icon="mdi-home"   v-model="proveed.direccion" required ></v-text-field>
                  <v-text-field label="telefono" type="tel"  prepend-icon="mdi-phone"  v-model="proveed.telefono" required  ></v-text-field>
                  
                   <v-card-actions class="justify-center"> 
                   <v-btn  color="green"           v-if="!bhabilitar"      @click.prevent="modificarProveedor" dark    type="submit">Editar</v-btn>
                   <v-btn  color="purple accent-3" v-if="bhabilitar"   @click.prevent="crearProveedor" dark    type="submit">guardar</v-btn>
                    <v-btn color="red" dark @click=" dialog=false" >cancelar</v-btn>
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
import { mapState, mapMutations } from "vuex"

export default {
    name:'Proveedor',
    data(){
        return{
            api:'https://61d654c7b7381600171814db.mockapi.io/proveedor_empresa_asociada/',
            id:'',
            bhabilitar:'',
            dialog: false,
            proveedor:[],
            proveed:{  nombre:'', direccion:'',telefono:''  },
            tituloForm:'',
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
            this.tituloForm='Agregar proveedor';
            this.proveed.nombre='';
            this.proveed.direccion='';
            this.proveed.telefono='';
          },


        async getProveedores(){
        try{
            this.mostrarLoading({titulo:"Cargando",color:"secondary"});
            const datos=await axios.get(this.api);
            this.proveedor= datos.data;
        
        }catch(error){
            console.log(error);
        
        }
        finally{
            this.ocultarLoading()
        }
        },

        async crearProveedor(){
            if(this.proveed.nombre==='' || this.proveed.direccion===''||
                this.proveed.telefono===''){
                                    this.mostrarSnacbar({mensaje: 'Faltan datos!',
                                    color:'red'});
            }else{
            
            let proveedor={
                nombre:this.proveed.nombre,
                direccion:this.proveed.direccion,
                telefono:this.proveed.telefono
            }
            try{
                const response = await axios.post(this.api,proveedor);
                console.log(response.data)
                this.mostrarSnacbar({mensaje: response.data.nombre +' Se ha agregado',
                                    color:'green'});
                this.getProveedores();
            
            }catch(error){
                console.log(error);
            }finally{
                this.dialog=false;
            }}
        },
        modif(id,index){
            this.id=id;
            this.bhabilitar=false;
            this.dialog=true;
            this.tituloForm='Modificar cliente'
            this.proveed.nombre=this.proveedor[index].nombre;
            this.proveed.direccion=this.proveedor[index].direccion;
            this.proveed.telefono=this.proveedor[index].telefono;

        },
        async modificarProveedor(){
            let proveedor={
                nombre:this.proveed.nombre,
                direccion:this.proveed.direccion,
                telefono:this.proveed.telefono
            }
            try{     
                const response = await axios.put((this.api+this.id),proveedor);
                console.log("proveedor modificado: ",response.data)
                 this.mostrarSnacbar({mensaje: response.data.nombre+ ' Se ha modificado' ,
                                    color:'light-blue accent-3'});
                 this.getProveedores();
            }catch(error){
                console.log(error)
            }finally{
                this.dialog=false;
            }
        },
        async eliminarProveedor(id){
            const response = await axios.delete((this.api+id));
            console.log("proveedor eliminado: ",response.data)
                 this.mostrarSnacbar({mensaje: response.data.nombre+ ' Se eliminado!' ,
                                    color:'orange darken-1'});
             this.getProveedores();
        },

    },
    created(){
      this.menuinicio.estado=true;
       this.inicio.estado=true;
      this.getProveedores();

    },  
}
</script>
<style lang="">
    
</style>