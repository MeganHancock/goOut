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
      <form>
      <div class="mb-3">
      <label for="eventName" class="form-label">Event Name</label>
      <input type="string" class="form-control" id="eventName" aria-describedby="eventName" minlength="3" maxLength="50" required>
      </div>
      <div class="mb-3">
      <label for="eventLocation" class="form-label">Description</label>
      <textarea class="form-control" id="floatingTextarea2" style="height: 100px"  minlength="15" maxLength="1000" required></textarea>
      </div>
      <div class="mb-3">
      <label for="eventLocation" class="form-label">Location</label>
      <input type="string" class="form-control" id="eventLocation" aria-describedby="eventLocation"  minlength="1" maxLength="500" required>
      </div>
      <div class="mb-3">
      <label for="eventCapacity" class="form-label">Capacity</label>
      <input type="number" class="form-control" id="eventCapacity" aria-describedby="eventCapacity"   min="1" max="5000" required>
      </div>
      <div class="mb-3">
      <label for="eventCapacity" class="form-label">Start Date</label>
      <input type="date" class="form-control" id="eventCapacity" aria-describedby="eventCapacity" required>
      </div>
      <div class="mb-3">
      <label for="eventCapacity" class="form-label">Start Date</label>
      <input type="enum" class="form-control" id="eventCapacity" aria-describedby="eventCapacity" required>
      </div>
      
      <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
      </div>
    </div>
  </div>
</div>






</template>


<script>
import Pop from '../utils/Pop.js'
// import { towerEventsService } from '../services/TowerEventsService.js'
import { ref } from 'vue'

export default {
setup(){
    const editableTowerEventData= ref({})
return{
editableTowerEventData,

//     async createTowerEvent(){
//         try {
//             const towerEvent = await towerEventsService.createTowerEvent()
            
//         } catch (error) {
//             Pop.error(error)
//         } 


// }
}
}
}
</script>


<style lang="scss" scoped>

</style>