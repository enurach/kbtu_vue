<template>
    <div class="controller">
        <div>
            <div id="date-title">
                <div class="blue-box" id="today">
                    <p>13.09.2024</p>
                </div>
                <div class="blue-box" id="title">
                    <p><strong>{{props.title}}</strong></p>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div id="filter">
                <div><img src="@/assets/filter.svg" /></div>
                <div class="rating">Rating</div>
                <div><img src="@/assets/triangle.svg" /></div>
            </div>
        </div>
        <div class="bottom">
            <div id="arrow">
                <button><img src="@/assets/Arrow.svg"/></button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        title: String,
    }); 
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

    #date-title {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: start;
    }
    
    #title {
        width: 300px;
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
        right: 100px;
        bottom: 40px;
    }

</style>