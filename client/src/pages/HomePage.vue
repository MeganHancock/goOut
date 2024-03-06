<template>
  <div class="container-fluid bg-img d-flex align-items-end p-3">
    <section class="row">
      <div class="col-5">
        <h1 class="text-light">Event management for people, by people</h1>
        <h4 class="text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati blanditiis quod ducimus dolores vel consectetur vero, eum eligendi exercitationem eaque laborum quisquam neque alias voluptatem adipisci corrupti eos molestias!</h4>
      </div>
    </section>
  </div>
  <div class="container">
    <!-- NOTE TWO CLICKABLE INFO CARDS -->
<section class="row d-flex justify-content-between mb-4 m-2">
  <div class="col-12">
    <h3>How Tower Works</h3>
  </div>
  <div class="col-md-5 col-12 clickable-info-card p-3 d-flex rounded-3 mb-3">
    <i class="mdi mdi-magnify fs-1 text-success"></i>
    <div>
      <p class="fs-4">
        Discover events you're interested in
      </p>
      <p>Browse through community hosted events for all the things you love</p>
    </div>
  </div>

  <div class="col-md-5 col-12 clickable-info-card p-3 d-flex rounded-3  mb-3">
    <i class="mdi mdi-plus fs-1 text-success"></i>
    <div>
      <p class="fs-4">
        Start and event to invite your friends
      </p>
      <p>Create your own Tower event, and draw from a community of millions</p>
      <p class="text-success">Create an event</p>
    </div>
  </div>


</section>

<!-- NOTE EXPLORE CATEGORY BUTTONS -->
<section class="row mb-4">
  <div class="col-12"><h3>Explore top categories</h3></div>
</section>

<!-- NOTE EVENT CARD COMPONENT-->
    <section v-if="towerEvents" class="row m-auto">
      <div  v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 d-flex justify-content-center mb-5">
<TowerEventCard :towerEvent="towerEvent"/>
      </div>
    </section>




  </div>
</template>

<script>
import {  computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { AppState } from '../AppState.js';
import TowerEventCard from '../components/TowerEventCard.vue'

export default {

  setup() {

onMounted(()=>{
  getTowerEvents()
})

async function getTowerEvents(){
  try {
    await towerEventsService.getTowerEvents()    
  } catch (error) {
    Pop.error(error)
  }

}

    return {
      towerEvents: computed(()=> AppState.towerEvents)
    }
  },
  components: {TowerEventCard}
}
</script>
<style scoped lang="scss">

.bg-img{
  background-image: url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  height: 500px;
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover; 
}

.clickable-info-card{
  background-color: lightgray;
  
}
</style>
