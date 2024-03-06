<template>
    <div class="">
        <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid event-grid-image">
        <p class="mb-0">{{ towerEvent.name }}</p>
        <p class="mb-0">{{ towerEvent.startDate }}</p>
        <p class="mb-0">{{ towerEvent.startTime   }}</p>
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
    max-width: 20vh;
    // max-height: 10vh;
    object-fit: cover;
    aspect-ratio: 2/1;
}

</style>