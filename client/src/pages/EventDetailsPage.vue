<template>
  <div v-if="towerEvent" class="container">
    <section class="row">
      <div class="col-12">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid rounded-3">
      </div>
      <div class="col-8 mt-5">

        <h1><span :class="{ 'is-canceled': towerEvent.isCanceled }">{{ towerEvent.name }} </span> <span
            v-if="towerEvent.isCanceled" class="text-danger">Canceled</span></h1>
        <p>{{ towerEvent.description }}</p>

        <p>Date and Time</p>
        <p>{{ towerEvent.startDate }} at {{ towerEvent.startTime }}</p>

        <p>Location</p>
        <p>{{ towerEvent.location }} </p>

        <p>Hosted by:</p>
        <p>{{ towerEvent.creator.name }} </p>



      </div>

      <!-- NOTE BUTTONS SECTION. -->
      <div class="col-md-4 text-center">

        <!-- NOTE ATTEND BUTTON -->
        <!--  && account.id != towerEvent.creatorId :hidden="isAttending || towerEvent.isCanceled" -->
        <div v-if="account.id">
          <div>
            <h5 class="mb-0 mt-5 fw-bold">Interested in going?</h5>
            <p class="mb-1">Grab a ticket!</p>
            <button @click="createTicket()" type="button" class="btn btn-info mb-3 w-75">Attend</button>
            <p class="text-end mb-5"><span class="text-success fw-bold">2</span> spots left!</p>
          </div>
          <!-- NOTE CAN'T GO BUTTON -->
          <div>
            <h5 class="mb-0 mt-5 fw-bold">Can no longer attend?</h5>
            <p class="mb-1">Let the host know!</p>
            <button type="button" class="btn btn-warning mb-3 w-75">Can't go</button>
            <p class="text-end mb-5"><span class="text-success fw-bold">2</span> spots left!</p>
          </div>
          <!-- NOTE EDIT BUTTON -->
          <div v-if="towerEvent.creatorId == account.id && !towerEvent.isCanceled">
            <h5 class="mb-1 mt-5 fw-bold">Update your event</h5>
            <button type="button" class="btn btn-success mb-3 me-md-2 w-25 me-1">Update</button>
            <button @click="cancelTowerEvent()" type="button" class="btn btn-danger mb-3 w-25">Cancel</button>
            <p class="text-end mb-5"><span class="text-success fw-bold ">2</span> spots left!</p>
          </div>
        </div>
        <!-- NOTE ATTENDANCE COUNT -->
        <div class="text-start mt-5">
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
import { ticketsService } from '../services/TicketsService.js';
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
      account: computed(() => AppState.account),
      eventAttendees: computed(() => AppState.ticketedEventAttendees),

      async cancelTowerEvent() {
        try {
          const towerEventToCancel = AppState.activeTowerEvent
          const wantsToCancel = await Pop.confirm(`Are you sure you want to cancel ${towerEventToCancel.name}?`)
          if (!wantsToCancel) return
          await towerEventsService.cancelTowerEvent(towerEventToCancel.id)
        } catch (error) {
          Pop.error(error)
        }
      },

      async createTicket() {
        logger.log('creating ticket')
        try {
          const eventData = { eventId: route.params.eventId }
          await ticketsService.createTicket(eventData)
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
