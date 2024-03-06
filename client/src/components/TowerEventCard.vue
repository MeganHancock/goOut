<template>
    <div class="">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid event-grid-image">
        <p class="mb-0 fw-bold">{{ towerEvent.name }}</p>
        <p class="mb-0">{{ towerEvent.startDate }} - {{ towerEvent.location }}</p>
        <p class="mb-0">(TODO ticket count) Attending</p>
    </div>
</template>


<script>
import { TowerEvent} from '../models/TowerEvent.js'

export default {
    props: { towerEvent: {type: TowerEvent, required: true}},
setup(){
return{}
}
}
</script>


<style lang="scss" scoped>

.event-grid-image{
    max-width: 100%;
    // max-height: 10vh;
    object-fit: cover;
    aspect-ratio: 2/1;
}

</style>