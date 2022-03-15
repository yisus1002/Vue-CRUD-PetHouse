<template >
    <div> 
       <v-container  > 
            <v-row class="d-flex justify-center">
                <v-col  sm="10"> 
                  <h1 class="fontp text-center ">Bienvenido a petHouse</h1>
                  <v-card-text class="text-justify subtitle-2">
                        <v-icon size="35" color="brown darken-4" >mdi-paw</v-icon>
                          Somos una organización que busca mejorar la calidad de vida de animales en estado de calle, principalmente 
                          de los perros y gatos, buscandoles un hogar optimo para ellos para que las personas los adopten.
                        <v-icon size="35" color="brown darken-4" >mdi-paw</v-icon>

                  </v-card-text>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
                <v-col  v-for="n in items"  :key="n.id"  class="d-flex child-flex"  cols="4" sm="4"  >
                  <v-img :src="n.src"   :lazy-src="n.src"   aspect-ratio="1" 
                   class="grey lighten-2 rounded-circle shadow"  >
                    <template v-slot:placeholder>
                      <v-row  class="fill-height ma-0"  align="center"  justify="center" >
                        <v-progress-circular  indeterminate  color="grey lighten-5" ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
            </v-row>
        </v-container>  
    </div>
</template>
<script>
export default {
    name:'Inicio',
    data(){
        return {
               items: [
                     { src: "https://www.tiendanimal.es/articulos/wp-content/uploads/2016/05/razas-de-perros-pequeno-1200x800.jpg"},
                     { src: 'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/594a1ced5bafe85dfd3c9869/gato-romano_0.jpg'},
                     { src: 'https://s1.eestatic.com/2021/11/24/curiosidades/mascotas/629697961_216041764_1706x960.jpg'},
                    ],
        }
    },
    created(){

    }
    
}
</script>
<style scoped>
    
</style>