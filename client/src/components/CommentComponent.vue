<template>
    <div class="card rounded shadow d-flex  flex-row p-2">
        <img :src="comment.creator.picture" :alt="comment.creator.name" class="user-icon align-self-center mx-2 mb-2">
        <div class="m-2">
            <h3 class="m-0">{{ comment.creator.name }}</h3>
            <p class="fw-lighter dates">Posted at {{ comment.timeCreatedAt }} at {{ comment.dateCreatedAt }}</p>
            <p class="box box-md box-lg">{{ comment.body }}</p>

            <!-- <button role="submit" class="btn btn-success text-end mt-1 ms-md-2 fw-bold text-center p-1 ">Remove
                Comment</button> -->
            <div>
                <button v-if="comment.creatorId == account.id" @click="removeComment(comment.id, comment.eventId)"
                    type="button"
                    class=" btn btn-warning p-1 fw-bold ms-1 me-1 mb-1 rounded-2  position-absolute position-absolute  bottom-0 end-0 rounded-0"
                    title="Delete your comment">❌</button>
            </div>

        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { Comment } from '../models/Comment.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';

export default {
    props: { comment: { type: Comment, required: true } },

    setup() {
        return {
            account: computed(() => AppState.account),

            async removeComment(commentId, eventId) {
                try {
                    const wantsToRemove = await Pop.confirm('Are you sure you would like to remove your comment?')
                    if (!wantsToRemove) return
                    await commentsService.removeComment(commentId, eventId)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.user-icon {
    height: 6vh;
    border-radius: 50%;
}

.dates {
    font-weight: lighter;
    font-size: 12px;
}


@media screen and (max-width: 440px) {
    .box {
        width: 15ch;
        word-break: break-all;
    }
}

// @media screen and (max-width: 600px) {
//     .box-md {
//         width: 25ch;
//     }
// }

// @media screen and (max-width: 700px) {
//     .box-lg {
//         width: 25ch;
//     }
// }</style>