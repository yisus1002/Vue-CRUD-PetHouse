<template >
  <v-footer  dark padless style="z-index: 1;" >
    <v-card flat tile class="white--text text-center" width="100%" >
      <v-card-text class="d-flex  py-1 flex-wrap flex-sm-nowrap blue-grey darken-2">
          <v-container  class="d-flex align-center justify-sm-start justify-center" >
              <h3 class=" font-italic title" >PetHouse</h3>
          </v-container>
            <v-container   class=" d-flex justify-sm-end flex-wrap justify-center">
                   <v-btn :href="icon.href " target="_blank"
                     v-for="(icon, index) of icons" :key="index" class="mx-4 white--text"  icon  >
                     <v-icon size="24px"> {{ icon.icon }} </v-icon>
                   </v-btn>
            </v-container>
      </v-card-text> 
      <v-card-text class="py-1 white--text text-center body-2 ">
        &copy;  {{ new Date().getFullYear() }} <small> PetHouse</small>
      </v-card-text>
    </v-card>
  </v-footer>
  
</template>
<script>
export default {
    name: 'Footer',
    data(){
        return{
             icons: [
                    {icon:'mdi-facebook' , href:'https://web.facebook.com/?_rdc=1&_rdr'},
                    {icon:'mdi-twitter'  , href:'https://twitter.com/?lang=es'},
                    {icon:'mdi-linkedin' , href:'https://co.linkedin.com/'},
                    {icon:'mdi-instagram', href:'https://www.instagram.com/'},
                    ],
        }
    },
}
</script>
<style >
    
</style>