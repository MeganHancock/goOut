<template>
  <div v-if="towerEvent" class="container">
    <section class="row">
      <div class="col-12">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid rounded-3">
      </div>
      <div class="col-8 mt-5">

        <h1 :class="{ 'is-canceled': towerEvent.isCanceled }">{{ towerEvent.name }}</h1>
        <p>{{ towerEvent.description }}</p>

        <p>Date and Time</p>
        <p>{{ towerEvent.startDate }} at {{ towerEvent.startTime }}</p>

        <p>Location</p>
        <p>{{ towerEvent.location }} </p>



      </div>

      <!-- NOTE BUTTONS SECTION -->
      <div class="col-4 text-center">

        <!-- NOTE ATTEND BUTTON -->
        <h5 class="mb-0 mt-5 fw-bold">Interested in going?</h5>
        <p class="mb-1">Grab a ticket!</p>
        <button type="button" class="btn btn-info mb-3">Attend</button>
        <p class="text-end mb-5"><span class="text-success fw-bold">2</span> spots left!</p>
        <!-- NOTE CAN'T GO BUTTON -->
        <h5 class="mb-0 mt-5 fw-bold">Can no longer attend?</h5>
        <p class="mb-1">Let the host know!</p>
        <button type="button" class="btn btn-warning mb-3">Can't go</button>
        <p class="text-end mb-5"><span class="text-success fw-bold">2</span> spots left!</p>
        <!-- NOTE EDIT BUTTON -->
        <h5 class="mb-1 mt-5 fw-bold">Update your event</h5>
        <button type="button" class="btn btn-success mb-3 me-2">Update</button>
        <button @click="cancelTowerEvent(towerEvent.id)" type="button" class="btn btn-danger mb-3">Cancel</button>
        <p class="text-end mb-5"><span class="text-success fw-bold">2</span> spots left!</p>

        <div class="text-start ms-0">
          <h5 class="mt-3">Attendees</h5>
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
import { logger } from '../utils/Logger.js';


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
      towerEvent: computed(() => AppState.activeTowerEvent),

      async cancelTowerEvent(eventId) {
        try {
          logger.log('canceling event', eventId)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.is-canceled {
  color: #565254;
  text-decoration: line-through
}
</style>
