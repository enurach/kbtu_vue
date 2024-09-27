<template>
    <div id="card">
        <div id="raw1">
            <div id="name-date">
                <p>{{person.name}}</p>
                <p>{{person.date}}</p>
            </div>
            <div id="ratting">
                <p>Rating</p>
                <div>
                    <img class="star" v-for="i in person.rating" src="@/assets/star.svg">
                </div>
            </div>
            <img :src= "imageSrc" />
        </div>
        <p class="comment">{{person.comment}}</p>
        <button id="like">Like</button>
    </div>
</template>

<script setup>
    const person = defineProps({
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        rating: Number,
        comment: Text,
        photo: {
            type: String,
            required: true,
        },

    });

    const imageSrc = new URL(`../assets/${person.photo}`, import.meta.url).href;


</script>

<style scoped>
    #card {
        position: relative;
        background-color: #2ba2d1;
        border-radius: 20px;
        border: 0;
        margin: 2% 2% 2% 2%;
    
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
        width: 40%;
        height: 100px;
    }

    #like {
        position: absolute;
        background-color: greenyellow;
        border: 0;
        border-radius: 20px;
        right: 10px;
        bottom: 10px;
        width: 80px;
        height: 25px;
        color: white;
    }

    p {
        color: white;
        font-size: 1rem;
        margin: 0;
        padding: 0;
    }

    img {
        width: 20%;
        height: 100%;
    }

    #ratting {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100px;
    }

    .star {
        width: 20px;
    }
    
    .comment {
        margin: 0 0 0 20px;
    }

</style>