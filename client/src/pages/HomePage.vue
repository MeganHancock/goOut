<template>
  <!-- NOTE HERO SECTION -->
  <div class="container-fluid bg-img d-flex align-items-end justify-content-center p-3 mb-3 mx-0">
    <section class="row">
      <div class="col-12 hero-text d-flex justify-content-center">
        <!-- col-md-5  -->
        <div>
          <h1 class="text-center display-1 text-light hero-text fw-bold">Go Out!</h1>
        </div>
        <!-- <h1 class="text-light">Event management for people, by people</h1>
        <p class="text-light fs-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati
          blanditiis
          quod ducimus dolores vel consectetur vero, eum eligendi exercitationem eaque laborum quisquam neque alias
          voluptatem adipisci corrupti eos molestias!</p>
      </div>
    </section> -->

      </div>
    </section>
  </div>


  <div class="container">

    <!-- NOTE TWO CLICKABLE INFO CARDS -->
    <section class="row d-flex justify-content-between mb-md-4  m-auto m-2">
      <div class="col-12 mt-2">
        <h3 class=" fs-4 fw-bolder">How Go Out! Works</h3>
      </div>
      <section class="row d-flex justify-content-between mt-3">
        <div class="col-md-5 col-12 clickable-info-card p-3 d-flex rounded-3 mb-3 shadow">
          <i class="mdi mdi-magnify fs-1 text-success"></i>
          <div>
            <p class="fs-4 mt-1">
              Discover events you're interested in
            </p>
            <p>Browse through community hosted events for all the things you love</p>
          </div>
        </div>

        <div class="col-md-5 col-12 clickable-info-card p-3 d-flex rounded-3 shadow mb-3">
          <i class="mdi mdi-plus fs-1 text-success"></i>
          <div>
            <p class="fs-4 mt-1">
              Start and event to invite your friends
            </p>
            <p>Create your own Go Out! event, and draw from a community of millions</p>
            <p role="button" class="text-success" data-bs-toggle="modal" data-bs-target="#eventFormModal">Create an
              event
            </p>
          </div>
        </div>
        <ModalComponent />

      </section>


    </section>

    <!-- NOTE EXPLORE CATEGORY BUTTONS -->
    <section class="row mb-4">
      <div class="col-12">
        <h3 class=" fs-4 fw-bolder ms-3">Explore top categories</h3>
      </div>
      <div class="col-12 mx-0 d-flex justify-content-between mt-3 fw-bold">

        <div @click="changeFilterTerm('all')" role="button" class="text-center">
          <i class="mdi mdi-infinity text-success  display-1"></i>
          <p class="fs-5">All</p>
        </div>
        <div @click="changeFilterTerm('concert')" role="button" class="text-center">
          <i class="mdi mdi-music text-primary display-1"></i>
          <p class="fs-5">Concerts</p>
        </div>
        <div @click="changeFilterTerm('convention')" role="button" class="text-center">
          <i class="mdi mdi-microphone text-warning display-1"></i>
          <p class="fs-5">Conventions</p>
        </div>
        <div @click="changeFilterTerm('sport')" role="button" class="text-center">
          <i class="mdi mdi-football text-danger  display-1"></i>
          <p class="fs-5">Sports</p>
        </div>
        <div @click="changeFilterTerm('digital')" role="button" class="text-center">
          <i class="mdi mdi-laptop text-info  display-1"></i>
          <p class="fs-5">Digital</p>
        </div>

      </div>
    </section>

    <!-- NOTE EVENT CARD COMPONENT-->
    <section v-if="towerEvents" class="row m-auto">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 d-flex justify-content-center mb-5">
        <TowerEventCard :towerEvent="towerEvent" />
      </div>
    </section>






  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { AppState } from '../AppState.js';
import TowerEventCard from '../components/TowerEventCard.vue'
import ModalComponent from '../components/ModalComponent.vue';
import { logger } from '../utils/Logger.js';

export default {

  setup() {
    const filterTerm = ref('all')
    onMounted(() => {
      getTowerEvents()
    })

    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      filterTerm,
      changeFilterTerm(term) {
        filterTerm.value = term
      },

      towerEvents: computed(() => {
        if (filterTerm.value == 'all') { return AppState.towerEvents }
        else { return AppState.towerEvents.filter(towerEvent => towerEvent.type == filterTerm.value) }
      })
    }
  },
  components: { TowerEventCard, ModalComponent }
}
</script>

<style scoped lang="scss">
.bg-img {
  background-image: url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
  height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.clickable-info-card {
  background-color: lightgray;
  font-weight: bold;
  font-size: 20px;
}

.hero-text {
  text-shadow: 3px 3px 3px black;
  font-size: 100px;
}
</style>
