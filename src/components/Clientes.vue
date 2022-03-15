<template >
    <div>
    <v-container fluid class="pl-md-14 d-flex justify-center " >
      <v-container  class=" px-0 pb-0" >
       <div class=" container-fluid mt-0 mx-auto col-sm-12 col-md-11 pt-0 px-0  shadow white rounded-lg" style="overflow:hidden;" >
            <h1 class=" justify-center fontp d-flex m-0 py-0 green" >Clientes <v-icon color=" purple accent-3" class="mx-3" size="34">mdi-paw</v-icon> </h1>
                 <v-btn color="purple accent-3" 
                 class="mx-4 mb-3 mt-1"
                     @click="limpiar " 
                  x-small elevation="5" fab  dark> <v-icon>mdi-plus</v-icon></v-btn>    
          <div class="container-fluid table-responsive cont-table">
            <table class="table table-sm table-hover " >
              <thead>
                <tr id="CabezeraC">
                  <th scope="col" >fila</th> 
                  <th class="text-center" scope="col">Nombres</th>
                  <th class="text-center" scope="col">Apellidos</th>
                  <th class="text-center" scope="col">email</th>
                  <th class="text-center" scope="col">Telefono</th>
                  <th class="text-center" scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody id="insertardC">
                   <tr class="text-start" :id="'row'+index" v-for="(item, index) of cliente" :key="index"  >
                        <td scope="row"> <v-container class=" justify-center d-flex" >  {{index + 1}}   </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.nombres}}           </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.apellidos}}         </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.email}}             </v-container></td>
                        <td > <v-container class=" justify-center d-flex" >  {{item.telefono}}          </v-container>  </td>
                        <td class=" m-0 p-0">
                            <v-container class="d-flex justify-center">
                                <v-btn color="red"  plain icon @click="modif(item.id, index)"    >  <v-icon small >mdi-pencil</v-icon> </v-btn>
                                <v-btn color="blue" plain icon @click="eliminarCliente(item.id)" >  <v-icon small >mdi-delete</v-icon> </v-btn>
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
                  <v-text-field label="Nombre" prepend-icon="mdi-account-circle"  v-model="client.nombres" required  ></v-text-field>
                  <v-text-field label="Apellidos" prepend-icon="mdi-account-question"   v-model="client.apellidos" required ></v-text-field>
                  <v-text-field type="email" prepend-icon="mdi-email" label="Email"    v-model="client.email" required  ></v-text-field>
                  <v-text-field type="tel"  prepend-icon="mdi-phone" label="Telefono"   v-model="client.telefono" required  ></v-text-field>
                  
                   <v-card-actions id="contbtn"> 
                   <v-btn  color="green"           v-if="!bhabilitar"      @click.prevent="modificarCliente" dark    type="submit">Editar</v-btn>
                   <v-btn  color="purple accent-3" v-if="bhabilitar"   @click.prevent="crearCliente" dark    type="submit">guardar</v-btn>
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
import { mapState,  mapMutations } from "vuex"


export default {
    name:'Clientes',
    data(){
        return {
            api:'https://61d654c7b7381600171814db.mockapi.io/cliente/',
            id:'',
             bhabilitar:'',
            dialog: false,
            cliente:[],
            client:{  nombres:'', apellidos:'', email:'',telefono:''  },
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
            this.tituloForm='Agregar cliente';
            this.client.nombres='';
            this.client.apellidos='';
            this.client.email='';
            this.client.telefono='';
          },


        async getClientes(){
        try{
            this.mostrarLoading({titulo:"Cargando",color:"secondary"})
            const datos=await axios.get(this.api);
            this.cliente= datos.data;
        
        }catch(error){
            console.log(error);
        
        }
        finally{
            this.ocultarLoading()
        }
        },

        async crearCliente(){
            if(this.client.nombres==='' || this.client.apellidos===''||
                this.client.email===''  || this.client.telefono===''){
                 this.mostrarSnacbar({mensaje: 'Faltan datos!',
                 color:'red'});
            }else{
            
            let client={
                nombres:this.client.nombres,
                apellidos:this.client.apellidos,
                email:this.client.email,
                telefono:this.client.telefono
            }
            try{
                const response = await axios.post(this.api,client);
                console.log(response.data)
                this.mostrarSnacbar({mensaje: response.data.nombres +' Se ha agregado',
                                    color:'green'});
                this. getClientes();
            
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
            this.client.nombres=this.cliente[index].nombres;
            this.client.apellidos=this.cliente[index].apellidos;
            this.client.email=this.cliente[index].email;
            this.client.telefono=this.cliente[index].telefono;

        },
        async modificarCliente(){
            let client={
                nombres:this.client.nombres,
                apellidos:this.client.apellidos,
                email:this.client.email,
                telefono:this.client.telefono,
            }
            try{     
                const response = await axios.put((this.api+this.id),client);
                console.log("cliente modificado: ",response.data)
                 this.mostrarSnacbar({mensaje: response.data.nombres+ ' Se ha modificado' ,
                                    color:'light-blue accent-3'});  
                this. getClientes();
            }catch(error){
                console.log(error)
            }finally{
                this.dialog=false;
            }
        },
        async eliminarCliente(id){
            const response = await axios.delete((this.api+`${id}`));
            console.log("cliente eliminado: ",response.data)
                 this.mostrarSnacbar({mensaje: response.data.nombres+ ' Se eliminado!' ,
                                    color:'orange darken-1'});
          
            this.getClientes();
        },

    },

    created(){ 
      this.menuinicio.estado=true;
       this.inicio.estado=true;
      this.getClientes();
    }, 
}
</script>
<style scoped>
#contbtn{
    display: flex;
    justify-content: center;
} 
</style>