<template>
    <div class="controller">
        <div>
            <div id="date-title">
                <div class="blue-box" id="today">
                    <p>13.09.2024</p>
                </div>
                <div class="blue-box" id="title">
                    <p><strong>{{cardStore.currentTitle}}</strong></p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div @click="store.toggleSearchMenueDropdown" id="filter">
                <div><img src="@/assets/filter.svg" /></div>
                <div class="rating">{{cardStore.currentSorting}}</div>
                <div><img src="@/assets/triangle.svg" /></div>
                <div v-show="store.searchMenueDropdownIsOpen"class="dropdown">
                    <div @click="triggerSort('Rating')" class="fil">Rating</div>
                    <div @click="triggerSort('Date')" class="fil">Date</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div id="arrow" v-if="cardStore.currentPage < cardStore.totalPages(4)">
                <button @click="nextPage()"><img src="@/assets/Arrow.svg"/></button>
            </div>
            <div id="back-arrow" v-if="cardStore.currentPage > 1">
                <button @click="prevPage()"><img src="@/assets/Arrow.svg"/></button>
            </div>
            <div class="pagin">{{ cardStore.currentPage }}/{{ cardStore.totalPages(numberOfCards) }}</div>
        </div>
    </div>
</template>

<script setup>
    import { usePostsStore } from '~/stores/cards';
    import { useStore } from '~/stores';

    const cardStore = usePostsStore();
    const store = useStore();
    
    const numberOfCards = 4;

    function triggerSort(sortValue) {
        cardStore.changeSorting(sortValue);
    }

    function nextPage() {
        cardStore.nextPage(numberOfCards);
    }

    function prevPage() {
        cardStore.prevPage();
    }

</script> 


<style scope>
    .controller {
        display: flex;
        flex-direction: raw;
        justify-content: space-between;
        flex-basis: 33%;
        height: 100%;
        width: 100%;
    }

    .blue-box {
        background-color: #2ba2d1;
        border-radius: 20px;
        border: 0;
        margin: 10px 20px 10px 30px;
        color: white; 
        font-size: 2rem;
    }

    .fil {
        width: 100%;
        text-align: center;
    }

    .fil:hover {
        background-color: gray;
        transition: .4s;
        cursor: pointer;
        color: white;
        
    }

    .zzz {
        z-index: 100 !important;
    }

    .filter:hover {
        cursor: pointer;
        transition: .4s;
    }

    #date-title {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: start;
    }
    
    #title {
        width: 400px;
        font-size: 3rem;
        display: flex;
        justify-content: center;
    }

    .dropdown {
        position: absolute;
        background-color: white;
        top: 50px;
        width: 100%;
        right: 0px;
        /* display: flex; */
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 100;
    }

    p {
        margin: 0;
        padding: 10px 20px 0 20px;
    }

    #filter {
        background-color: rgba(238, 252, 247, 1);
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        align-items: center;
        gap: 15px;
        height: 50px;
        position: absolute;
        bottom: 0px;
        right: 50px;
        width: 10rem;
    }

    .rating {
        color: rgba(29, 227, 144, 1);
        font-family: "Jersey 15";
        font-size: 26px;
        font-weight: 700;
    }
    
    button {
        background-color: rgb(255, 255, 255, 0);
        border: 0;
    }

    .bottom {
        position: relative;
    }

    #arrow {
        position: absolute;
        right: 50px;
        bottom: 40px;
    }

    #back-arrow {
        position: absolute;
        right: 160px;
        bottom: 45px;
        transform: rotate(180deg); 
    }


    .pagin {
        position: absolute;
        right: 1.5rem;
        bottom: -1rem;
        color: rgba(255, 255, 255, 1);
        font-size: 48px;
        line-height: 60px;
    }

</style>