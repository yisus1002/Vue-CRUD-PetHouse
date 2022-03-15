<template >
    <div>
    <v-snackbar v-model="snackbar.estado" :color="snackbar.color" >
        <div class="d-flex justify-space-between align-center" >
            {{ snackbar.mensaje }}
            <v-btn  plain  dark  @click="snackbar.estado = false" > cerrar</v-btn>
        </div>
    </v-snackbar>
    </div>
</template>
<script>
import { mapState} from "vuex"

export default {
    name:'Snackbar',
    data(){
return{ 

}
    },
    computed:{
        ...mapState(['snackbar'])
    },
    methods: {
        
    },
}
</script>
<style lang="">
    
</style>