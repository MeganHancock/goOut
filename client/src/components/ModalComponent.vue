<template>

  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventFormModal">
  Launch demo modal
</button> -->

  <!-- Modal -->
  <div class="modal fade" id="eventFormModal" tabindex="-1" aria-labelledby="eventFormModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <!-- NOTE FORM SECTION -->
          <form @submit.prevent="createTowerEvent()">
            <div class="mb-3">
              <label for="eventName" class="form-label">Event Name</label>
              <input v-model="editableTowerEventData.name" type="string" class="form-control" id="eventName"
                aria-describedby="eventName" minlength="3" maxLength="50" required>
            </div>
            <div class="mb-3">
              <label for="eventDescription" class="form-label">Description</label>
              <textarea v-model="editableTowerEventData.description" class="form-control" id="floatingTextarea2"
                style="height: 100px" minlength="15" maxLength="1000" required></textarea>
            </div>
            <div class="mb-3">
              <label for="eventLocation" class="form-label">Location</label>
              <input v-model="editableTowerEventData.location" type="string" class="form-control" id="eventLocation"
                aria-describedby="eventLocation" minlength="1" maxLength="500" required>
            </div>
            <div class="mb-3">
              <label for="eventEventImage" class="form-label">Event Image</label>
              <input v-model="editableTowerEventData.coverImg" type="string" class="form-control" id="eventLocation"
                aria-describedby="eventLocation" minlength="1" maxLength="1000" required>
            </div>
            <div class="mb-3">
              <label for="eventCapacity" class="form-label">Capacity</label>
              <input v-model="editableTowerEventData.capacity" type="number" class="form-control" id="eventCapacity"
                aria-describedby="eventCapacity" min="1" max="5000" required>
            </div>
            <div class="mb-3">
              <label for="eventCapacity" class="form-label">Start Date</label>
              <input v-model="editableTowerEventData.startDate" type="date" class="form-control" id="eventStartDate"
                aria-describedby="eventCapacity" required>
            </div>

            <div class="form-floating mb-3">
              <label for="eventType" class="form-label">Event Category</label>
              <select v-model="editableTowerEventData.type" class="form-select" id="eventType"
                aria-label="Floating label select example" required>
                <option v-for="eventType in eventTypes" :key="eventType" :value="eventType">{{ eventType }}</option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Create Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>






</template>


<script>
import Pop from '../utils/Pop.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import { ref } from 'vue'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const editableTowerEventData = ref({ name: '', description: '', coverImg: '', capacity: '', startDate: '', location: '' })
    return {
      editableTowerEventData,
      eventTypes: ['concert', 'convention', 'sports', 'digital'],

      async createTowerEvent() {
        try {
          const towerEvent = await towerEventsService.createTowerEvent(editableTowerEventData.value)
          editableTowerEventData.value = { name: '', description: '', type: '', coverImg: '', capacity: '', startDate: '', location: '' }
          // Modal.getOrCreateInstance('#eventFormModal').hide()
          // router.push({ name: 'Event Details', params: { eventId: towerEvent.id } })
        } catch (error) {
          Pop.error(error)
        }


      }
    }
  }
}
</script>


<style lang="scss" scoped></style>