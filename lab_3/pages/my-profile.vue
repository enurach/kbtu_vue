<template>
    <div class="back">
        <div class="wraper">
            <p class="big">My Profile</p>
            <div class="profile-info">
                <img :src="`/images/${avatar}`"/>
                <div calss="main-info">
                    <p class="name">{{ name }}</p>
                    <p class="age"> Age: <input type='number'v-model="editedAge"></input></p>
                    <p class="place"> <input v-model="editedPlace"></input></p>
                    <p class="activity"> Activity: for now </p>
                    <div class="rating">
                        <p class="ratting-text">Current ratings:</p>
                        <Ratting :rating="cardStore.getAuthorAverageRating(user_id)"/>
                    </div>
                </div>
                <div class="control">
                    <button @click="router.push('/my-statistics')" >Statistic</button>
                    <button @click="saveEdited()">Save</button>
                    <button @click="router.push('/my-friends')">Friends</button>
                </div>
            </div>
            <button class="left-text">Latest posts</button>
            <div class="latest-posts">
                <Card 
                    v-for="card in cards" :key="card.id" :id="card.id" :usage="1"
                />
            </div>
            <div>
                <div v-if="total_pages!==0" class="aligh-rigt">
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
    import { useRouter } from 'vue-router';

    definePageMeta({
        middleware: 'auth',
    });


    const userStore = useUserStore(); 
    const cardStore = usePostsStore();

    const user_photo = ref('avatar.svg');

    const current_page = ref(1);
    const total_pages = ref(0);

    const router = useRouter();


    const user_id = computed(() => {
        if (userStore.loggedInUser)
            return userStore.loggedInUser.id;
        return 1;
    });

    const avatar = computed(() => {
        if (userStore.loggedInUser) {
            return userStore.loggedInUser.avatar;
            }
        return user_photo.value;
    });

    const name = computed(() => {
        if (userStore.loggedInUser) {
            return userStore.loggedInUser.name;
            }
        return user_photo.value;
    });

    const age = computed(() => {
        if (userStore.loggedInUser) {
            return userStore.loggedInUser.age;
            }
        return 0;
    });

    const place = computed(() => {
        if (userStore.loggedInUser) {
            return userStore.loggedInUser.place;
            }
        return user_photo.value;
    });


    const editedAge = ref(age.value);
    const editedPlace = ref(place.value)

    const cards = computed(() => {
        return cardStore.paginatedAuthorCards(2, user_id.value, current_page.value);
    });

    total_pages.value = Math.ceil(cardStore.getAuthorCards(user_id.value).length / 2);

    function nextPage() {
        if (current_page.value < total_pages.value)
            current_page.value += 1;
    }

    function prevPage() {
        if (current_page.value > 1)
            current_page.value -= 1;
    }

    function saveEdited() {
        const userObj = {
            id: userStore.loggedInUser.id,
            age: editedAge.value,
            place: editedPlace.value,
        }
        console.log(userObj)
        userStore.updateUser(userObj);
    }

</script>


<style>
    button {
        cursor: pointer;
    }
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
    .place {
        margin: 5px 0;
        font-size: 1.5em;
        color: yellow;
    }

    .activity {
        font-size: 1em;
        color: rgb(150, 250, 0);
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
        background-color: white;
        width: 100%;
        min-width: 200px;
        margin: 10px;
    }

    .big {
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

    input {
        background-color: #adebff;
        font-family: Inknut Antiqua;
        font-weight: 900;
        text-align: left;
        text-underline-position: from-font;
        text-decoration-skip-ink: none;

    }
</style>