<template>
  <div class="container-fluid d-flex align-items-center justify-content-center p-3 mb-3 mx-0 account-hero">
    <section class="row">
      <div class="col-12 about text-center">
        <h1 class="display-4 fw-bold">Hello, {{ account.name }}!</h1>
        <h1>Manage your events here!</h1>
        <img class="rounded" :src="account.picture" alt="" />
      </div>

    </section>

  </div>

  <!-- NOTE CAN'T GO BUTTON -->
  <!-- <div>
            <h5 class="mb-0 mt-5 fw-bold">Can no longer attend?</h5>
            <p class="mb-1">Let the host know!</p>
            <button @click="removeTicket()" type="button" class="btn btn-warning mb-3 w-75">Can't
              go</button>
            <p class="text-end mb-5"><span class="text-success fw-bold">2</span> spots left!</p>
          </div> -->

  <section v-if="towerEvents" class="row m-auto">
    <div v-for="towerEvent in towerEvents" :key="towerEvent.event.id" class="col-md-4  mb-5 position-relative">
      <TowerEventCard :towerEvent="towerEvent.event" />
      <button @click="removeTicket(towerEvent.ticketId)" type="button"
        class="btn btn-warning p-1 fw-bold ms-1 mx-3  position-absolute position-absolute  bottom-0 end-0 rounded-0">Can't
        go?</button>
    </div>
  </section>

</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import TowerEventCard from '../components/TowerEventCard.vue'
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';

export default {
  setup() {
    onMounted(() => {
      getMyTickets()
    })

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      account: computed(() => AppState.account),

      towerEvents: computed(() => AppState.myTicketedEvents),

      async removeTicket(ticketId) {
        try {
          const wantsToRemove = await Pop.confirm('Are you sure you would like to cancel your ticket?')
          if (!wantsToRemove) return
          await ticketsService.removeTicket(ticketId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  },
  components: { TowerEventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.account-hero {
  background-image: url('https://images.unsplash.com/photo-1549605775-b5b37eefbb1b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29udmVudGlvbnxlbnwwfHwwfHx8MA%3D%3D');
  color: white;
  text-shadow: 3px 3px 2px black;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
