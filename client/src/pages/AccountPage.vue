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

  <section v-if="towerEvents" class="row m-auto">
    <div v-for="towerEvent in towerEvents" :key="towerEvent.event.id"
      class="col-md-4 d-flex justify-content-center mb-5">
      <TowerEventCard :towerEvent="towerEvent.event" />
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

      towerEvents: computed(() => AppState.myTicketedEvents)

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
