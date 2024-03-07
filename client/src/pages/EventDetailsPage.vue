<template>
  <div v-if="towerEvent" class="container">
    <section class="row">
      <div class="col-12">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid">
      </div>
      <div class="col-8">
        <h1>{{ towerEvent.name }}</h1>
        <p>{{ towerEvent.description }}</p>

        <p>Date and Time</p>
        <p>{{ towerEvent.startDate }} at {{ towerEvent.startTime }}</p>

        <p>Location</p>
        <p>{{ towerEvent.location }} </p>



      </div>


      <div class="col-3 text-center">
        <h5>Interested in going?</h5>
        <p>Grab a ticket!</p>
        <button type="button" class="btn btn-info">Attend</button>
        <p class="text-end">2 spots left!</p>

        <div class="text-start">
          <h5>Attendees</h5>
          <p><i class="mdi mdi-dots-vertical"></i><i class="mdi mdi-face-man-profile"></i>attendee name</p>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { towerEventsService } from '../services/TowerEventsService.js';


export default {
  setup() {
    const route = useRoute()
    onMounted(() => {
      getTowerEventById()
    })

    async function getTowerEventById() {
      try {
        await towerEventsService.getTowerEventById(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      towerEvent: computed(() => AppState.activeTowerEvent)
    }
  }
}
</script>
