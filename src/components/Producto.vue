<template >
    <div>
    <v-container fluid class="pl-md-14 d-flex justify-center " >
      <v-container  class=" px-0 pb-0" >
    <div class=" container-fluid mt-0 mx-auto col-sm-12 col-md-11 pt-0 px-0 shadow white rounded-lg" style="overflow:hidden;" >
            <h1 class=" justify-center fontp  d-flex m-0 py-0  green " >Productos<v-icon color="purple accent-3" class="mx-3" size="34">mdi-shopping</v-icon> </h1>
                 <v-btn color="purple accent-3" 
                 class="mx-4 mb-3 mt-1"
                     @click="limpiar " 
                  x-small elevation="5" fab  dark> <v-icon>mdi-plus</v-icon></v-btn>        
          <div class="container-fluid table-responsive cont-table">
            <table class="table table-sm table-hover " >
              <thead>
                
                <tr id="CabezeraP">
                  <th scope="col" >fila</th> 
                  <th class="text-center" scope="col">Nombre </th>
                  <th class="text-center" scope="col">Precio</th>
                  <th class="text-center" scope="col">Tipo producto</th>
                  <th class="text-center" scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody id="insertardP">
                   <tr class="text-start" :id="'row'+index" v-for="(item, index) of Producto" :key="index"  >
                        <td scope="row"> <v-container class=" justify-center d-flex" >  {{index + 1}}  </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.nombre}}           </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.precio}}           </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.tipo_producto}}    </v-container></td>
                        <td class=" m-0 p-0">
                            <v-container class="d-flex justify-center">
                                <v-btn color="red"  plain icon @click="modif(item.codigo_producto, index)"    >  <v-icon small >mdi-pencil</v-icon> </v-btn>
                                <v-btn color="blue" plain icon @click="eliminarProducto(item.codigo_producto)" >  <v-icon small >mdi-delete</v-icon> </v-btn>
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
                  <v-text-field label="Nombre"  prepend-icon="mdi-account-circle"   v-model="Produc.nombre" required  ></v-text-field>
                  <v-text-field  type="number"  prepend-icon="mdi-cash"  color="green" label="Precio"    v-model="Produc.precio" required ></v-text-field>
                  <v-combobox  prepend-icon="mdi-bottle-soda"
                     v-model="Produc.tipo_producto"
                     :items="items_product"
                     label="Seleccione el tipo de producto" 
                   ></v-combobox>
              
                   <v-card-actions class="justify-center"> 
                   <v-btn  color="green"           v-if="!bhabilitar"      @click.prevent="modificarProducto" dark    type="submit">Editar</v-btn>
                   <v-btn  color="purple accent-3" v-if="bhabilitar"   @click.prevent="crearProducto" dark    type="submit">guardar</v-btn>
                    <v-btn color="red" dark @click=" dialog=false" >cancelar</v-btn>
                </v-card-actions>
                </v-form> 
            </v-card>
        </v-dialog>
 <Snackbar></Snackbar>
      </v-container>
     </v-container>
    
    </div>
</template>
<script>

import axios from "axios";
import { mapState, mapMutations } from "vuex"
import Snackbar from './shared/Snackbar.vue'

export default {
    name:'Producto',
    data(){ return{
       api:'https://61d654c7b7381600171814db.mockapi.io/producto/',
            id:'',
             bhabilitar:'',
            dialog: false,
            Producto:[],
            Produc:{  nombre:'', precio:'',tipo_producto:''  },
            tituloForm:'',
            items_product: [ 'Aseo','Alimento', 'Accesorio','Juguetes', 'Otro' ],
        
    }},
    components:{
        Snackbar,
    },
     computed:{
        ...mapState(['menuinicio','inicio']),
    },
    methods:{
        ...mapMutations(["mostrarLoading","ocultarLoading", 'mostrarSnacbar']),
        limpiar(){
            this.dialog=true;
            this.bhabilitar=true;
            this.tituloForm='Agregar producto';
            this.Produc.nombre='';
            this.Produc.precio='';
            this.Produc.tipo_producto='';
            },
        async getProducto(){
        try{
            this.mostrarLoading({titulo:"Cargando",color:"secondary"})
            const datos=await axios.get(this.api);
            this.Producto= datos.data;
        
        }catch(error){
            console.log(error);
        
        }
        finally{
            this.ocultarLoading()
        }
        },
        async crearProducto(){
            if(this.Produc.precio==='' || this.Produc.nombre==='' || this.Produc.tipo_producto===''){
                                    this.mostrarSnacbar({mensaje: 'Faltan datos!',
                                    color:'red'});
            }else{
            
            let Produc={
                nombre:this.Produc.nombre,
                precio:this.Produc.precio,
                tipo_producto:this.Produc.tipo_producto,
                }
            try{
                const response = await axios.post(this.api,Produc);
                console.log(response.data)
                this.mostrarSnacbar({mensaje: response.data.nombre +' Se ha agregado',
                                    color:'green'});
                this. getProducto();

            }catch(error){
                console.log(error);
            }finally{
                this.dialog=false;
            }}
        },
        
        modif(id,index){
              this.id=id;
              console.log(this.id)
              this.bhabilitar=false;
              this.dialog=true;
              this.tituloForm='Modificar producto'
              this.Produc.nombre=this.Producto[index].nombre;
              this.Produc.precio=this.Producto[index].precio;
              this.Produc.tipo_producto=this.Producto[index].tipo_producto;
          },
        async modificarProducto(){
            let Prduc={
                nombre:this.Produc.nombre,
                precio:this.Produc.precio,
                tipo_producto:this.Produc.tipo_producto,
            }
            try{     
                const response = await axios.put((this.api+this.id),Prduc);
                console.log("Producto modificado: ",response.data);
                 this.mostrarSnacbar({mensaje: response.data.nombre+ ' Se ha modificado' ,
                                    color:'light-blue accent-3'});
                this.getProducto();
            }catch(error){
                console.log(error)
            }finally{
                this.dialog=false;
            }


        },
        async eliminarProducto(id){
            const response = await axios.delete((this.api+`${id}`));
            console.log("Producto eliminado: ",response.data);
                 this.mostrarSnacbar({mensaje: response.data.nombre+ ' Se eliminado!' ,
                                    color:'orange darken-1'});
            this.getProducto();
        },



    },
    created(){
      this.menuinicio.estado=true;
       this.inicio.estado=true;
      this.getProducto();

    },  
}
</script>
<style >
    
</style>