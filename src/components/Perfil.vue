<template >
    <div> 
        <v-container   class="p-1  mx-cols-0 mx-sm-0 col-12 " > 
             <v-card  class="mx-auto "    max-width="1300"   color="grey lighten-4" > 
                 <v-skeleton-loader max-height="300" type="card"   class="brown lighten-5" >  </v-skeleton-loader> 
               <v-card-text     class="pt-6 white black--text "  style="position: relative;" > 
                 <v-btn   absolute
                   color="blue"  class="white--text"
                   fab top  x-large  
                   >   
                   <span class="white--text ">{{ user.initials }}</span>
                </v-btn >
                <v-card-title   class="d-flex justify-space-between">
                    {{ user.nombres }}
                    <v-btn color="" small fab :disabled="btneditarp.estado" @click="dialog =true" >  
                        <v-icon color="blue" >mdi-pencil</v-icon> 
                    </v-btn>
                </v-card-title>
                <v-card-text  dark  class="align-center py-1" >
                    <v-row class="m-0"   >
                        <v-col class="d-flex  p-1 " cols="12" sm="6" md="4"    >
                            <h6  class="mr-2 my-auto">E-mail:</h6>  
                            <v-chip color="green">
                                {{user.email}}
                            </v-chip>
                        </v-col>
                        <v-col class="d-flex p-1 " cols="12" sm="6" md="4"    >
                            <h6 class="mr-2 my-auto">Telefono:</h6>  
                            <v-chip color="cyan accent-3">
                                {{user.telefono}}
                            </v-chip>
                        </v-col>
                        <v-col class="d-flex  p-1" cols="12" sm="6" md="4"    >
                            <h6 class="mr-2 my-auto">Usuario</h6>  
                            <v-chip color="yellow darken-2">
                                {{user.usuario}}
                            </v-chip>
                        </v-col>
                    </v-row>

                </v-card-text>
               </v-card-text>
             </v-card>
            
        </v-container>
        <v-dialog v-model="dialog" width="500"  persistent>

            <v-card>

                <v-form class="p-4">
                  <v-text-field label="Nombre" prepend-icon="mdi-account-circle"  v-model="user.nombres" required  ></v-text-field>
                  <v-text-field label="Apellidos" prepend-icon="mdi-account-question"   v-model="user.apellidos" required ></v-text-field>
                  <v-text-field type="email" prepend-icon="mdi-email" label="Email"    v-model="user.email" required  ></v-text-field>
                  <v-text-field type="tel"  prepend-icon="mdi-phone" label="Telefono"   v-model="user.telefono" required  ></v-text-field>
                  <v-text-field type="text"   prepend-icon="mdi-account-circle" label="Usuario"   v-model="user.usuario" required  ></v-text-field>
                  <v-text-field type="text"   prepend-icon="mdi-key-variant "  label="Password"   v-model="user.password" required  ></v-text-field> 
                   <v-card-actions id="contbtnr" class="justify-center"> 
                   <v-btn  color="green" dark  @click.prevent="modificarUsuario"  type="submit">Editar</v-btn> 
                    <v-btn color="red" dark @click=" dialog=false" >cancelar</v-btn>
                </v-card-actions>
                </v-form> 
            </v-card>
        </v-dialog> 
    </div>
</template>
<script> 
import { mapState ,  mapMutations} from "vuex" 
import axios from "axios";

export default {
    name:"Perfil",
        data(){
            return {
      user: {
        initials: '',
        nombres: '',
        apellidos:'',
        email: '',
        telefono:'',
        usuario:'',
        password:'',
        id:JSON.parse(localStorage.getItem('id'))
      },
      dialog: false,
            }
        },  
        methods:{
         ...mapMutations(["mostrarLoading","ocultarLoading", 'mostrarSnacbar']),
        async getUser(){
      
        try{
            if(this.user.id!=null){
            const datos=await axios.get('https://61d654c7b7381600171814db.mockapi.io/cliente/'+this.user.id);
            const {nombres,apellidos,email, telefono,usuario,password,id}= datos.data;
            this.user.nombres=nombres;
            this.user.apellidos=apellidos;
            this.user.email=email;
            this.user.telefono=telefono;
            this.user.usuario=usuario;
            this.user.password=password;
            this.user.id=id; 
            const nombreC=`${nombres} ${apellidos}`
            const nombreI=nombreC.split(' ');
            this.user.initials=`${nombreI[0].substring(0,1).toUpperCase()}${nombreI[1].substring(0,1).toUpperCase()}`
            }else{
            this.user.initials='UA'
            this.user.nombres='Anonimo';
            } 
        }catch(error){
            console.log(error);
        
        } 
        },
        async modificarUsuario(){
            if(this.user.nombres==='' || this.user.apellidos===''||
               this.user.email===''  || this.user.telefono===''||
               this.user.usuario===''   || this.user.password===''){
              this.mostrarSnacbar({mensaje: 'Faltan datos!',
                 color:'red'});
            }else{ 
            let client={
                nombres:this.user.nombres,
                apellidos:this.user.apellidos,
                email:this.user.email,
                telefono:this.user.telefono,
                usuario:this.user.usuario,
                password:this.user.password, 
            } 
            try{       
                const response = await axios.put(('https://61d654c7b7381600171814db.mockapi.io/cliente/'+this.user.id),client); 
                 this.mostrarSnacbar({mensaje: response.data.nombres+ ' Se ha modificado' ,
                                    color:'light-blue accent-3'});  
  
                this.getUser();
            }catch(error){
                console.log(error)
            }finally{
                   this.dialog=false;
            }}
        },
        },
        computed:{
        ...mapState(['menuinicio','inicio','usuario','btneditarp']),
        }, 
        created(){
            console.log(this.btneditarp.estado)
         let id= JSON.parse(localStorage.getItem('id')); 
       if(id===null){ 
        //    id=null
        }else{
          this.user.id=id;
        }
             this.getUser();
             this.menuinicio.estado=false;
             this.inicio.estado=true; 
        } 
}
</script>
<style scoped>
</style>