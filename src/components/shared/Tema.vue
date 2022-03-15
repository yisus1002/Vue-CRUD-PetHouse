<template>
    <div>
 <v-btn class="mx-1" 
         icon small 
        @click="modo=!modo; " 
        v-model="cambiarmodo">
 <v-icon :color="ic.color">{{ic.i}}</v-icon> 
        </v-btn>
         
    </div>
</template>
<script>
export default {
    name:'tema',
    data(){
        return {
            modo: false,
            ic:{  i:'', color:'' },
            tema:'black',
        }
    },
    computed:{
 cambiarmodo(){
        if(this.modo==true){
          this.ic.i=' mdi-weather-sunny';
          this.ic.color='white'
          this.$vuetify.theme.dark=true
        }else{
          this.ic.i='mdi-weather-night';
          this.ic.color='blue'
          this.$vuetify.theme.dark=false
        }
        localStorage.setItem('tema', JSON.stringify(this.modo));
      }
    },
    created(){
        let tema= JSON.parse(localStorage.getItem('tema')); 
       if(tema===null){
           this.modo=false;
        }else{
          this.modo=tema;
        }
    }
}
</script>
<style >
    
</style>