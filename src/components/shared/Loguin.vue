<template >
    <div>  
        <v-container    class="d-flex align-items-center " style="height:750px;">
          <v-btn fixed top left icon style="z-index: 2;" @click="volver"><v-icon color="red">mdi-keyboard-return</v-icon></v-btn>
               <v-card width="500px" class="p-3  m-auto"> 
                   <h3 class="text-center fontp">PetHouse  <v-icon size="35" color="brown darken-4" >mdi-paw</v-icon></h3>
                   <v-chip-group    v-model="selection"  active-class="deep-purple accent-4 white--text"  column >
                        <v-chip class="mx-auto" @click=" reset; mosfor=true  ">Iniciar sesión</v-chip> 
                        <v-chip  class="mx-auto" @click=" reset; mosfor=false ">Crea tu cuenta</v-chip> 
                   </v-chip-group>
                <v-card-text class="text-center" >  {{titulo}} tienes cuenta en <strong>Pethouse</strong>
                </v-card-text>
                 <v-form  ref="form"  v-model="valid"  lazy-validation >  {{mos()}} 
                     <v-container v-if="mosfor==true">
                     <v-text-field
                        prepend-icon="mdi-account-circle"   solo  v-model="user"   :counter="15"  :rules="nameRules"
                        label="Ingrese su usuario"   required  rounded >
                      </v-text-field>  
                     <div class="d-flex"> 
                        <v-text-field  prepend-icon="mdi-key-variant "  solo :type="password.tipo"  v-model="password.pass"
                            :rules="passwordRules"  label="Ingrese su contraseña"  required
                            rounded >  
                        </v-text-field>
                         <v-btn class="m-2" @click=" password.estado =! password.estado" icon small>
                           <v-icon :color="ic.color" >{{ic.i}}</v-icon>
                         </v-btn>
                     </div>
                     </v-container> 
                     <v-container v-if="mosfor==false">
                        <v-text-field
                         solo   prepend-icon="mdi-email"  v-model="email"  :rules="emailRules"
                         label="Ingrese su E-mail"  required   rounded >
                       </v-text-field> 
                        <v-text-field  solo  prepend-icon="mdi-phone"  type="tel"  v-model="tel"  :rules="telRules"
                          label="Ingrese su Telefono"  required rounded >
                       </v-text-field>
                     <v-text-field  prepend-icon="mdi-account-circle"   solo   v-model="nombre" 
                        :rules="nombreRules"  label="Ingrese su nombre"  required  rounded >
                      </v-text-field> 
                     <v-text-field
                       prepend-icon="mdi-account-question"  solo  v-model="apellido"  :rules="apellidoRules"
                        label="Ingrese sus apellidos" required  rounded >
                      </v-text-field>
                     <v-text-field   prepend-icon="mdi-account-circle"   solo   v-model="user"  :counter="15"  :rules="nameRules"
                        label="Ingrese su usuario" required  rounded >
                      </v-text-field>  
                     <div class="d-flex"> 
                        <v-text-field  prepend-icon="mdi-key-variant "  solo   :type="password.tipo"
                            v-model="password.pass"  :rules="passwordRules"   label="Ingrese su contraseña"  required  rounded >  
                        </v-text-field>
                         <v-btn class="m-2" @click=" password.estado =! password.estado" icon small>
                           <v-icon :color="ic.color" >{{ic.i}}</v-icon>
                         </v-btn>
                     </div>
                     </v-container>
                    <v-container class="d-flex justify-center"  > 
                       <v-btn v-if="mosfor==true "  :disabled="!valid"  color="success "
                         class="mr-4 text-capitalize "  @click="validacion"                          
                          > Ingresar
                        </v-btn> 
                       <v-btn v-if="mosfor==false"  :disabled="!valid" type="submit"  color="success " 
                         class="mr-4 text-capitalize " @click.prevent="crearCliente" > 
                         Registrarse
                        </v-btn> 
                      <v-btn   color="error"  class="mr-4 text-capitalize "  @click="reset" >
                        Limpiar formulario
                      </v-btn>
                    </v-container>
                </v-form>
               </v-card>
        </v-container>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex"
import axios from "axios";

export default {
    name:'Loguin',
    data(){
        return{
           ic:{  i:'', color:'' },
           mosfor:true,
           titulo:"",
            selection:0,
            valid: true,
            ruta:{ r:''},
      user: '',
      respueta:[],
      nameRules: [
        v => !!v || 'El usuario es requerido',
        v => (v && v.length <= 15) || 'Demasiados caracteres',
      ],
      password:{  pass:'', tipo: '', estado: true },
      passwordRules:[
        v => !!v || 'La contraseña es requerida ',
      ],
      email: '',
      emailRules: [
        v => !!v || 'El E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail es invalido',
      ],
      tel:'',
      telRules:[
        v => !!v || 'El telefono es requerido',
      ],
      nombre:'',
      nombreRules:[
        v => !!v || 'El nombre es requerido',
      ],
      apellido:'',
      apellidoRules:[
          v => !!v || 'El apellido es requerido',
      ], 
        } 
    },
        computed:{
    ...mapState(['menuinicio','inicio', 'usuario']), 
    },
    methods:{
        ...mapMutations(["mostrarLoading","ocultarLoading", 'mostrarSnacbar']),
          mos(){
        if( this.password.estado==true){
          this.ic.i="mdi-eye"
          this.ic.color="green accent-3"
          this.password.tipo= "password"
        }else {
          this.ic.i="mdi-eye-off" 
          this.ic.color="green"
          this.password.tipo= "name"
         } 
         if(this.mosfor==true){
           this.titulo=" Ingresa si ya "
         }else{
           this.titulo=" Registrate si aun no " 
         }  
      },
   
      async obtenerUsuarios(){ 
          try{ 
              const datos=await axios.get('https://61d654c7b7381600171814db.mockapi.io/cliente/');
              this.respuesta=datos.data; 
          }catch(error){
              console.log(error);
          }   
      },
      async validacion(){
            this.$refs.form.validate();
              const usuario =await  this.respuesta.find(element=> element.usuario==this.user && element.password==this.password.pass);
              if(usuario){ 
                localStorage.setItem('id', JSON.stringify(usuario.id));
                return  this.$router.push('Home');
              }else{
                 this.mostrarSnacbar({mensaje: 'Usuario y/o Contraseña incorrecta!',
                 color:'red'});           
              } 
      }, 
      async crearCliente(){ 
        this.$refs.form.validate();
            if(this.nombre==='' || this.apellido===''||
               this.email===''  || this.tel===''||
               this.user===''   || this.password.pass===''){
              this.mostrarSnacbar({mensaje: 'Faltan datos!',
                 color:'red'});
            }else{ 
            let client={
                nombres:this.nombre,
                apellidos:this.apellidos,
                email:this.email,
                telefono:this.tel,
                usuario:this.user,
                password:this.password.pass, 
            } 
            try{
                const usuario=await  this.respuesta.find(element=> element.usuario==client.usuario || element.email==client.email);
              if(usuario){ 
                return this.mostrarSnacbar({mensaje: usuario.email +' y/o '+ usuario.usuario+'ya existe en la base de datos',
                                    color:'red'});
                }
                const response = await axios.post('https://61d654c7b7381600171814db.mockapi.io/cliente/',client);
                console.log(response.data) 
                  localStorage.setItem('id', JSON.stringify(response.data.id));
                this.mostrarSnacbar({mensaje: response.data.nombres +' Cuenta creada',
                                    color:'green'});
                                    this.reset()
                this.obtenerUsuarios();
                return  this.$router.push('Home');
            
            }catch(error){
                console.log(error);
            }finally{
                this.dialog=false;
                this.mosfor==true;
            }}
        },
      reset () {
        this.$refs.form.reset()
      }, 
      volver(){
        this.inicio.estado=false;
        this.$router.push('/')
         
      }
    },

    created(){ 
        this.obtenerUsuarios();  
        this.menuinicio.estado=true;
        this.inicio.estado=null;
    }
}
</script>
<style scoped>  
</style>