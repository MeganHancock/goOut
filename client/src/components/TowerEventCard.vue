<template>
    <RouterLink :to="{ name: 'Event Details', params: { eventId: towerEvent.id } }">
        <div class="text-dark">
            <img :src="towerEvent.coverImg" :alt="towerEvent.name" class="img-fluid event-grid-image shadow rounded">

            <p class="mb-0 fw-bold mt-1"><span
                    :class="{ 'is-canceled': towerEvent.isCanceled || towerEvent.ticketCount == towerEvent.capacity }">{{
        towerEvent.name }}
                </span>
                <span v-if="towerEvent.isCanceled" class="text-danger"> Canceled</span>
                <span v-if="towerEvent.ticketCount == towerEvent.capacity" class="text-danger"> At capacity</span>

            </p>

            <!-- <p class="mb-0 fw-bold">{{ towerEvent.name }}</p> -->

            <div v-if="!towerEvent.isCanceled">

                <p class="mb-0">{{ towerEvent.startDate }} - {{ towerEvent.location }}</p>
                <p class="mb-0"><span class="fw-bold text-success">
                        {{ towerEvent.ticketCount }}
                    </span> Attending</p>
            </div>
        </div>

    </RouterLink>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js'

export default {
    props: { towerEvent: { type: TowerEvent, required: true } },
    setup() {
        return {

        }
    }
}
</script>


<style lang="scss" scoped>
.event-grid-image {
    max-width: 100%;
    // max-height: 10vh;
    object-fit: cover;
    aspect-ratio: 2/1;
}

.is-canceled {
    color: #565254;
    text-decoration: line-through
}
</style>