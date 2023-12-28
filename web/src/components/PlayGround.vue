<template>
    <div class="playground">
        <GameMap/>
    </div>
</template>

<script>
import GameMap from './GameMap.vue';

    export default{
        
        components:{
            GameMap,
        }
    }

</script>

<style scoped>

div.playground{
    width: 60vw; /* 浏览器宽度的60%  */
    height: 70vh; /* 屏幕宽度的70% */
    /*background: lightblue; /* 背景颜色 */
    margin: 40px auto; /* 距离上方40px，auto是左右居中 */
}

</style>