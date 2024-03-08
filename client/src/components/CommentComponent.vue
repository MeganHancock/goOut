<template>
    <div class="card rounded shadow d-flex  flex-row p-2">
        <img :src="comment.creator.picture" :alt="comment.creator.name" class="user-icon align-self-center mx-2 mb-2">
        <div class="m-2">
            <h3>{{ comment.creator.name }}</h3>
            <p>{{ comment.body }}!</p>
        </div>
    </div>
</template>


<script>
import { Comment } from '../models/Comment.js';

export default {
    props: { comment: { type: Comment, required: true } },

    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.user-icon {
    height: 6vh;
    border-radius: 50%;
}
</style>