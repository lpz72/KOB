<template>
    <!-- ref="parent"就可将下面的parent与此div绑定 -->
    <div  ref="parent" class="gamemap">
        <!-- ref="canvas"就可将下面的canvas与此canvas绑定 -->
        <canvas ref="canvas" tabindex="0" ></canvas> <!-- 加上tabindex="0"，让用户可以用键盘输入操作蛇 -->
    </div>
</template>

<script>
import { GameMap } from '../assets/scripts/GameMap';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

    export default {
        setup:() => {
            const store = useStore();

            let parent = ref(null);
            let canvas = ref(null);

            //组件挂载完成后需要执行那些操作
            onMounted(() => {
                new GameMap(canvas.value.getContext('2d'), parent.value,store)
            });

            return {
                parent,
                canvas
            }
        }

    }
</script>

<style scoped>

div.gamemap{
    width: 100%;
    height: 100%;
    display: flex; /* 居中 */
    justify-content: center; /* 水平居中 */
    align-items: center;  /* 竖直居中 */ 
}

</style>