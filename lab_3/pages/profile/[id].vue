<template>
    <div class="back">
        <div class="wraper">
            <p class="big">Profile</p>
            <div class="profile-info">
                <img :src="`/images/${avatar}`"/>
                <div calss="main-info">
                    <p class="name">{{ name }}</p>
                    <p class="age"> Age: {{ age }}</p>
                    <p class="place">{{ place }}</p>
                    <p class="activity"> Activity: was 5 minute ago </p>
                    <div class="rating">
                        <p class="ratting-text">Current ratings:</p>
                        <Ratting :rating="cardStore.getAuthorAverageRating(id)"/>
                    </div>
                </div>
                <div class="control">
                    <button @click="follow(id)" class="follow">Follow</button>
                    <button @click="router.push(`/chat/${id}`)" class="chat-now">Chat Now</button>
                    <button @click="router.push(`/friends/${id}`)" class="friends">Friends</button>
                </div>
            </div>
            <button class="left-text">Latest posts</button>
            <div class="latest-posts">
                <Card 
                    v-for="card in cards" :key="card.id" :id="card.id"
                />
            </div>
            <div>
                <div class="aligh-rigt">
                    <button @click="prevPage"><img class="left-arrow" src="assets/triangle.svg" /></button>
                    <p> {{ current_page }}/{{ total_pages }} </p>
                    <button @click="nextPage"><img class="right-arrow" src="assets/triangle.svg" /></button>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>

    import Ratting from '~/components/Ratting.vue';
    import { useUserStore } from '~/stores/users';
    import { usePostsStore } from '~/stores/cards';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter();
    const route = useRoute()
    const id = Number(route.params.id); 


    const userStore = useUserStore(); 
    const cardStore = usePostsStore();

    const user_photo = ref('avatar.svg');

    const current_page = ref(1);
    const total_pages = ref(1);


    const user_id = computed(() => {
        if (userStore.loggedInUser)
            return userStore.loggedInUser.id;
        return 0;
    });

    if(id == user_id.value) {
        router.push('/my-profile');
    }

    const profile = userStore.getById(id);


    const avatar = computed(() => {
        if (profile) {
            return profile.avatar;
        }
        return user_photo.value;
    });

    const name = computed(() => {
        if (profile) {
            return profile.name;
            }
        return user_photo.value;
    });
    const age = computed(() => {
        if (profile) {
            return profile.age;
            }
        return user_photo.value;
    });
    const place = computed(() => {
        if (profile) {
            return profile.place;
            }
        return user_photo.value;
    });


    const cards = computed(() => {
        return cardStore.paginatedAuthorCards(2, id, current_page.value);
    });

    total_pages.value = Math.ceil(cardStore.getAuthorCards(id).length / 2);

    function follow(id) {
        userStore.addToFavorite(id);
    }

    function nextPage() {
        if (current_page.value < total_pages.value)
            current_page.value += 1;
    }

    function prevPage() {
        if (current_page.value > 1)
            current_page.value -= 1;
    }

</script>


<style>

    @font-face {
        font-family: 'MyCustomFont';
        src: url('assets/fonts/NordinSlabOutline-nRp9M.otf') format('opentype');
    }

    .back {
        position: absolute;
        font-family: 'MyCustomFont';
        z-index: 0;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background: linear-gradient(to bottom, #adebff, #f7e3e8);
        background-attachment: fixed;
    }



    .wraper {
        margin: 5% 10%;
        display: flex;
        flex-direction: column;
    }

    .profile-info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    .profile-info img{
        width: 15%;
    }

    .name {
        color: purple;
        font-size: 2em;
        margin: 0 0 10px;
        text-shadow: 1px 1px 2px black;
    }

    .age,
    .place{
        margin: 5px 0;
        font-size: 1.5em;
        color: yellow;
    }

    .activity {
        color: red;
        font-size: 1em;
    }

    .rating {
        color: rgb(121, 121, 121);
        display: flex;
        flex-direction: row;
        text-align: center;
    }

    .control {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .control button {
        font-family: 'MyCustomFont';
        font-size: 2.5em;
        width: 100%;
        min-width: 200px;
        margin: 10px;
    }

    .big {
        padding-right: 100px;
        text-align: right;
        color: white;
        font-size: 5em;
    }

    .left-text {
        position:relative;
        left: 60px;
        padding:5px 0;
        margin: 20px;
        width:150px;
        font-weight: 700;
        font-size: 1em;
        color: black;
        background-color: white;
    }

    .latest-posts {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .aligh-rigt {
        display: flex;
        flex-direction: row;
        float: right;
        padding: 10px;
        margin: 15px;
        background-color:  #2ba2d1;
        align-items: center;
        font-size: 1.5em;
    }

    .left-arrow{
        transform: rotate(90deg);
    }
    .right-arrow {
        transform: rotate(-90deg);
    }

    .follow {
        background-color: greenyellow;
    }
    .friends {
        background-color: #83cce4;
    }
    .chat-now {
        background-color: white;
    }
</style>