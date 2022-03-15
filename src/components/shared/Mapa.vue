<template >
    <div>
        <div id='map' style='width:100% ; height: 600px; border-radius:40px; overflow:hidden;'
         class="rounded">
            
        </div>
    </div>
</template>
<script>
// import mapboxgl from '!mapbox-gl/dist/mapbox-gl-csp';
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // 
export default {
    name:'Mapa',
    data(){
return { }
    },
    methods:{
        getMapa(){
 mapboxgl.accessToken = 'pk.eyJ1IjoiamVzdXNnMTAwMiIsImEiOiJja3p3N2MxazUxNmE0MnZtaHBjbTVoeDh5In0.t2Af6kwawJdt3b9xYby9Pw';
const map=  new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/dark-v10', // style URL
center: [-75.88143, 8.74798], // starting position [lng, lat]
zoom: 11 // starting zoom
});
        }
    },
    mounted(){
  this.getMapa(); 
//   this.getMapa(); 
    }
    ,

    created(){
    //  this.getMapa()

    }


}
</script>
<style >
    
</style>