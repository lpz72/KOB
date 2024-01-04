<template>
    <ContenField>
        我的Bot
    </ContenField>
</template>

<script>
import ContenField from '@/components/ContenField.vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default{
    components:{
        ContenField,
    },

    setup:() => {
        const store = useStore();

        // $.ajax({
        //     url: "http://localhost:3000/user/bot/add/",
        //     type: "post",
        //     headers:{
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     data:{
        //         title: "bot标题",
        //         description: "bot描述",
        //         content: "bot代码",
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // });
        // $.ajax({
        //     url: "http://localhost:3000/user/bot/remove/",
        //     type: "post",
        //     headers:{
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     data:{
        //         bot_id: 4,
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // });

        // $.ajax({
        //     url: "http://localhost:3000/user/bot/update/",
        //     type: "post",
        //     headers:{
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     data:{
        //         bot_id: 3,
        //         title: "bot标题3",
        //         description: "bot描述3",
        //         content: "bot代码3",
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // });

        $.ajax({
            url: "http://localhost:3000/user/bot/getlist/",
            type: "get",
            headers:{
                Authorization: "Bearer " + store.state.user.token,
            },
            success(resp){
                console.log(resp);
            },
            error(resp){
                console.log(resp);
            }
        });
    }
}

</script>

<style scoped>

</style>