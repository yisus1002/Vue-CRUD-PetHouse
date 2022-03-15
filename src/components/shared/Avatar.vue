<template >
    <div>
<v-menu 
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            small
            v-on="on"
          >
            <v-avatar
              color="brown"
              size="28"
            >
              <span class="white--text text-uppercase ">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                link
                to="/perfil"
              >
                Mi perfil
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                link
                type="submit"
                href="/"
                text
              >
                Salir
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>      
    </div>
</template>
<script> 

import axios from "axios";

export default {
    name:'Avatar',
      data: () => ({
      user: {
        initials: '',
        fullName: '',
        email: '',
        id:JSON.parse(localStorage.getItem('id'))
      },
    }),
    methods:{
    async getUser(){
      
        try{
            if(this.user.id!=null){
            const datos=await axios.get('https://61d654c7b7381600171814db.mockapi.io/cliente/'+this.user.id);
            const {nombres,apellidos,email}= datos.data;
            this.user.fullName=`${nombres} ${apellidos}`;
            this.user.email=email;
            const nombreC=this.user.fullName.split(' ');
            this.user.initials=`${nombreC[0].substring(0,1).toUpperCase()}${nombreC[1].substring(0,1).toUpperCase()}`
            }else{
              this.user.initials='UA'
              this.user.fullName='Usuario Anónimo'
            }
           
        
        }catch(error){
            console.log(error);
        
        }
        
        },
    
    
    },
    created() {
      this.getUser();
    },





}
</script>
<style >
    
</style>