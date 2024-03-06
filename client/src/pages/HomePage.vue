<template>
  <div class="container">
    <section class="row">
      <div v-if="towerEvents" class="col-12">
{{ towerEvents }}
      </div>
    </section>
  </div>
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
      towerEvents: computed(()=> AppState.towerEvents)
    }
  }
}
</script>
<style scoped lang="scss">

</style>../services/TowerEventsService.js
