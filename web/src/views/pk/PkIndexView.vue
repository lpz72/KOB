<!-- 调用关系PkIndexView -> PlayGround.vue(背景) -> GameMap.vue(生成对象)
     -> GameMap.js(实时计算地图尺寸，将地图画出) ->(继承) AcGameObject.js  -->

<template>
    <PlayGround/>
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';

export default{
    components:{
        PlayGround,
    }
}

</script>

<style scoped>

</style>