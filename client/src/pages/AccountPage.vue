<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <!-- <section v-if="towerEvents" class="row m-auto">
    <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 d-flex justify-content-center mb-5">
      <TowerEventCard :towerEvent="towerEvent" />
    </div>
  </section> -->

</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import TowerEventCard from '../components/TowerEventCard.vue'
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    onMounted(() => {
      // getMyHostedTowerEvents()
    })

    // async function getMyHostedTowerEvents() {
    //   try {
    //     // logger.log()
    //     await towerEventsService.getMyHostedTowerEvents()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }

    return {
      account: computed(() => AppState.account),

      // towerEvents: computed(() => {

      // })
    }
  },
  // components: { TowerEventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
