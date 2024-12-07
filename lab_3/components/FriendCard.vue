<template>
    <div id="card">
        <NuxtLink :to="`/profile/${card.id}`" id="raw1">
            <img :src="`/images/${card.avatar}`" alt="User Avatar" />
        </NuxtLink>
            <div id="name-date">
            <template v-if="isEditing">
                <input 
                    v-model="editableName" 
                    class="name-input" 
                    @keydown.enter="saveName" 
                />
                <p class="activity">Activity: 5 minutes ago</p>
            </template>
            <template v-else>
                <p class="name">{{ card.name }}</p>
                <p class="activity">Activity: 5 minutes ago</p>
            </template>
            </div>
        
        <button v-if="cardProps.usage===0" id="delete" @click="deleteCard(card.id)"><p>UNFOLLOW</p></button>
        <button @click="isEditing=true" v-if="cardProps.usage===0 && !isEditing" id="rename" ><p>RENAME</p></button>
        <button @click="saveName" v-if="cardProps.usage===0 && isEditing" id="rename" ><p>SAVE</p></button>
        <button v-if="cardProps.usage===0" id="chat" @click="likeCard(card.id)"><p>CHAT</p></button>

        <button v-if="cardProps.usage===1" id="chat" @click="follow(card.id)" ><p>FOLLOW</p></button>

    </div>
</template>

<script setup>

    import { usePostsStore } from '~/stores/cards';
    import { useUserStore } from '~/stores/users';

    import { defineProps } from 'vue';


    const cardStore = usePostsStore()
    const userStore = useUserStore()

    const cardProps = defineProps({
        id: {
            type: Number,
            required: true
        },
        usage: {
            type: Number,
            default: 0,
        }
    });

    const card = userStore.getById(cardProps.id);
    const isEditing = ref(false);
    const editableName = ref(card.name);

    function likeCard(id) { 
        if(userStore.isLoggedIn)
            cardStore.likeCard(id, userStore.loggedInUser.id);
    }

    function deleteCard(id) {
        userStore.unfollow(id);
    }

    function follow(id) {
        userStore.addToFavorite(id);
    }

    function saveName() {
        const userObj = {
            id: cardProps.id,
            name: editableName.value,
        }
        card.name = editableName.value;
        userStore.updateUserName(userObj);
        isEditing.value = false;
    }
</script>

<style scoped>
    #card {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 15px 0;
    }

    #raw1 {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: row;
    }

    #name-date {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    #chat {
        background-color: greenyellow;
        border: 0;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        color: white;
    }

    #rename {
        background-color: rgb(43, 178, 193);
        border: 0;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        color: white;
    }

    #delete{
        background-color: red;
        border: 0;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        color: white;
    }

    p {
        color: white;
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
    }

    img {
        width: 80px;
        height: 80px;
    }

    .activity {
        color: red;
    }

</style>