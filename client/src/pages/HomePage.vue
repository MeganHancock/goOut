<template>
  <div class="container"></div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';

export default {

  setup() {

onMounted(()=>{
  getEvents()
})

async function getEvents(){
  try {
    await eventsService.getEvents()
    
  } catch (error) {
    Pop.error(error)
  }

}

    return {
      
    }
  }
}
</script>
<style scoped lang="scss">

</style>
