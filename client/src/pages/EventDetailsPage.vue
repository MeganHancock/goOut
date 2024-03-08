<template>
  <div v-if="towerEvent" class="container ">
    <section class="row justify-content-around ms-md-5">
      <div class="col-12 text-center">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid rounded-3">
      </div>
      <h4 v-if="isAttending && !towerEvent.isCanceled" class="text-success text-center mt-5">You are attending this
        event!</h4>
      <div class="col-12"></div>

      <div class="col-md-8 mt-5 me-md-5">

        <h1 class="d-flex align-items-center mb-1"><span
            :class="{ 'is-canceled': towerEvent.isCanceled || towerEvent.ticketCount == towerEvent.capacity }"
            class="fw-bold">{{
    towerEvent.name }} </span>
          <span v-if="!towerEvent.isCanceled" class="bg-info p-2 fs-6 fw-light text-light rounded-5 ms-3">{{
    towerEvent.type }}</span>
          <span v-if="towerEvent.isCanceled" class="text-danger ms-3"> Canceled</span>
          <span v-if="towerEvent.ticketCount == towerEvent.capacity" class="text-danger ms-3"> At capacity</span>
        </h1>
        <p>{{ towerEvent.description }}</p>

        <p class="fw-bold mb-0">Date and Time</p>
        <p>{{ towerEvent.startDate }} at {{ towerEvent.startTime }}</p>

        <p class="fw-bold mb-0">Location</p>
        <p>{{ towerEvent.location }} </p>

        <p class="fw-bold mb-0">Hosted by:</p>
        <p>{{ towerEvent.creator.name }} </p>
      </div>

      <!-- NOTE BUTTONS SECTION. -->
      <div class="col-md-3 text-center">
        <div class="p-3">
          <div v-if="account.id && account.id != towerEvent.creatorId"
            :hidden="isAttending || towerEvent.isCanceled || towerEvent.ticketCount == towerEvent.capacity">
            <h5 class="mb-1 mt-5 fw-bold">Interested in going?</h5>
            <p class="mb-1">Grab a ticket!</p>
            <button @click="createTicket()" type="button" class="btn btn-info mb-3 w-100">Attend</button>
            <p class="text-end mb-5"><span class="text-success fw-bold">{{ remainingCapacity }}</span> spots left!</p>
          </div>

          <!-- NOTE EDIT BUTTON -->
          <div v-if="towerEvent.creatorId == account.id && !towerEvent.isCanceled">
            <h5 class="mb-2 mt-5 fw-bold">Update your event</h5>
            <button @click="console.log('this will be an edit button :D ')" type="button"
              class="btn btn-success mb-3 me-md-2 me-1 p-3">Update</button>
            <button @click="cancelTowerEvent()" type="button" class="btn btn-danger mb-3 p-3">Cancel</button>
            <p class="text-end mb-5"><span class="text-success fw-bold ">{{ remainingCapacity }}</span> spots left!</p>
          </div>
        </div>

        <!-- NOTE ATTENDANCE COUNT -->
        <div v-if="eventAttendees.length && !towerEvent.isCanceled" class="text-start">
          <h5 class="mt-3 mb-3 fw-bold text-center">Attendees {{
    eventAttendees.length }}</h5>
          <div v-for="attendee in eventAttendees" :key="attendee.profile" class="mt-1">
            <p class="d-flex align-items-center"><i class="mdi mdi-dots-vertical fs-3"> </i>
              <span class="me-2"><img :src="attendee.profile.picture" :alt="attendee.profile.name"
                  class="profile-icon"></span>
              {{ attendee.profile.name }}
            </p>
          </div>
        </div>

      </div>
    </section>



    <!-- NOTE COMMENT SECTION -->
    <div v-if="!towerEvent.isCanceled" class="col-12 action-card p-2 pb-md-3 rounded-2 mt-3">

      <section class="row justify-content-center">
        <div class="col-md-10 m-md-3 mb-md-0">
          <form @submit.prevent="postComment()">
            <div class="form-floating d-md-flex align-items-center">
              <textarea v-model="commentData.body" class="form-control " placeholder="Leave a comment here"
                id="floatingTextarea2" style="height: 100px" minlength="5" maxLength="500" required></textarea>
              <label for="floatingTextarea2">Comments</label>
              <button role="submit" class=" btn btn-success text-end mt-1 ms-md-2 fw-bold text-center p-1 ">Post
                Comment</button>
            </div>
          </form>
        </div>
      </section>

      <section v-if="comments.length" class="row d-flex justify-content-center rounded-2  m-1 py-3 position-relative">
        <div v-for="comment in comments" :key="comment.id" class="col-md-10 mb-2">
          <CommentComponent :comment="comment" />

        </div>
      </section>

    </div>

  </div>

</template>

<script>
import { AppState } from '../AppState';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { towerEventsService } from '../services/TowerEventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import { commentsService } from '../services/CommentsService.js';
import CommentComponent from '../components/CommentComponent.vue';


export default {
  setup() {
    const commentData = ref({})

    const route = useRoute()
    onMounted(() => {
      getTowerEventById()
      getTicketsByEventId()
      getCommentsByEventId()
    })

    async function getTowerEventById() {
      try {
        await towerEventsService.getTowerEventById(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getTicketsByEventId() {
      try {
        await ticketsService.getTicketsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getCommentsByEventId() {
      try {
        await commentsService.getCommentsByEventId(route.params.eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      commentData,

      towerEvent: computed(() => AppState.activeTowerEvent),
      account: computed(() => AppState.account),
      eventAttendees: computed(() => AppState.ticketedEventAttendees),
      isAttending: computed(() => AppState.ticketedEventAttendees.some(attending => attending.accountId == AppState.account.id)),
      remainingCapacity: computed(() => AppState.activeTowerEvent.capacity - AppState.activeTowerEvent.ticketCount),
      comments: computed(() => AppState.comments),

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
        // logger.log('creating ticket')
        try {
          const eventData = { eventId: route.params.eventId }
          await ticketsService.createTicket(eventData)
          // logger.log('is attending')
        } catch (error) {
          Pop.error(error)
        }

      },

      async postComment() {
        try {
          logger.log('posting comment')
          // @ts-ignore
          commentData.value.eventId = route.params.eventId
          await commentsService.postComment(commentData.value)
        } catch (error) {
          Pop.error(error)
        }
      }


    }
  },
  components: { CommentComponent }

}
</script>

<style scoped lang="scss">
.is-canceled {
  color: #565254;
  text-decoration: line-through
}

.action-card {
  background-color: lightgray;

}

.profile-icon {
  border-radius: 50%;
  height: 3vh;
}
</style>// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
