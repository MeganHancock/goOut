<template>
  <div class="container"></div>
</template>

<script>
import {  computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { AppState } from '../AppState.js';

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
      events: computed(()=> AppState.events)
    }
  }
}
</script>
<style scoped lang="scss">

</style>../services/TowerEventsService.js
