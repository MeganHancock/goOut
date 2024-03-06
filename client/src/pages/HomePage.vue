<template>
  <div class="container">
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

</style>../services/TowerEventsService.js
