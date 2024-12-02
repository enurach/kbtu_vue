<template>
    <div class="back">
        <div class="wraper">
            <div class="topper">
                <div class="arrow">
                    <button @click="back()"><img src="@/assets/Arrow.svg"/></button>
                </div>
                <p class="big">Statistic</p>
            </div>
            <div class="stats">
                <BarChart :labels="input.labels" :data="input.numbers" />
                <div class="calendar">
                    <p class="date-range">{{range.start.getDate()}}.{{ range.start.getMonth()+1}}.{{ range.start.getFullYear() }} - {{range.end.getDate()}}.{{ range.end.getMonth()+1}}.{{ range.end.getFullYear() }}</p>
                    <VDatePicker 
                        v-model.range="range"
                        :locale="'en-US'"
                        is-expanded
                    />
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>

    import BarChart from '~/components/BarChart.vue';
    import { usePostsStore } from '~/stores/cards';
    import { useUserStore } from '~/stores/users';


    definePageMeta({
        middleware: 'auth',
    });

    const postStore = usePostsStore();
    const userStore = useUserStore();

    const range = ref({
        start: new Date(2000, 0, 1),
        end: new Date(),
    });

    const user_id = computed(() => {
        return userStore.loggedInUser.id;
    });

    const input = computed(() => {
        const {labels, numbers} = postStore.getStatistic(user_id.value, range.value);
        return {labels, numbers};
    });    

</script>


<style scoped>
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

    .topper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .wraper {
        margin: 5% 10%;
        display: flex;
        flex-direction: column;
    }

    .arrow {
        transform: rotate(180deg); 
    }
    
    .big {
        text-align: right;
        color: white;
        font-size: 5em;
    }

    .stats {
        display: flex;
        flex-direction: row;
        margin-top: 50px;
        background-color: rgba(255, 255, 255, 0.3);
        width: 80vw;
        height: 65vh;
    }


    .date-range{
        background-color: aliceblue;
        margin: 10px 0;
        padding: 10px 0;
        text-align: center;
    }

</style>