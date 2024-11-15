<template>
    <div id="card">
        <div id="raw1">
            <div id="name-date">
                <p>{{user.name}}</p>
                <p>{{card.PubDate}}</p>
            </div>
            <div id="ratting">
                <p>Rating</p>
                <Ratting :rating="card.Rating"/>
            </div>
            <img :src="`/images/${user.avatar}`" alt="User Avatar" />
        </div>
        <p class="comment">{{card.Commentary}}</p> 
        <button id="like" @click="likeCard(card.id)"><p>Like</p></button>
    </div>
</template>

<script setup>
    import Ratting from './Ratting.vue';

    import { usePostsStore } from '~/stores/cards';
    import { useUserStore } from '~/stores/users';

    import { defineProps, computed } from 'vue';

    const cardStore = usePostsStore()
    const userStore = useUserStore()

    const cardProps = defineProps({
        id: {
            type: Number,
            required: true
        }
    });

    const card = cardStore.getById(cardProps.id);
    const user = userStore.getById(card.authorId);

    function likeCard(id) {
        cardStore.likeCard(id);
    }

</script>

<style scoped>
    #card {
        position: relative;
        background-color: #2ba2d1;
        border-radius: 20px;
        border: 0;
    }

    #raw1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #name-date {
        border-radius: 10px;
        background-color:rgb(65, 188, 236, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 10px;
        min-width: 25%;
        padding: 10px
    }

    #like {
        background-color: greenyellow;
        border: 0;
        border-radius: 20px;
        width: 80px;
        height: 25px;
        margin-left: 85%;
        margin-bottom: 10px;
        color: white;
    }

    p {
        color: white;
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
    }

    img {
        width: 100px;
    }

    #ratting {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100px;
    }
    
    .comment {
        margin: 10px 20px;
    }
</style>