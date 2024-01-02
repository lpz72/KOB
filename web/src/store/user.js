import $ from 'jquery';

export default{
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        is_login: false,
        pulling_info: true, //是否正在从云端拉取数据，以此判断是否要显示登录页面，以及注册登录按钮
    },
    getters: {
    },
    //调用mutations里的函数用commit
    mutations: {
        updateUser(state,user){
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },

        updateToken(state,token){
            state.token = token;
        },

        //退出
        logout(state){
            state.id = "";
            state.username = "";
            state.photo = "",
            state.token = "",
            state.is_login = false;
        },

        //更新是否正在拉取数据
        updatePuiilingInfo(state,pulling_info){
            state.pulling_info = pulling_info;
        }
    },
    //调用actions里的函数用dispatch
    actions: {

        login(context,data){
            //登录
            $.ajax({
                url: "http://localhost:3000/user/account/token/",
                type: "post",
                data: {
                username: data.username,
                password: data.password,
                },
                success(resp) { //在这里resp就是后端返回的map
                    if (resp.error_message === "success"){
                        localStorage.setItem("jwt_token",resp.token); //将token存到浏览器的内存中,以字典形式存储
                        context.commit("updateToken",resp.token); //通过context.commit调用mutations里的函数
                        data.success(resp);
                    }
                    else {
                        data.error(resp);
                    }
                },
        
                error(resp) {
                data.error(resp);
                },
            });
        },

        getInfo(context,data){

            //返回个人信息
            $.ajax({
                url: "http://localhost:3000/user/account/info/",
                type: "get",
                headers:{
                Authorization: "Bearer " + context.state.token, //访问上面的都要用context
                },
                success(resp){
                    if (resp.error_message === "success"){ //成功时，更新用户信息
                        context.commit("updateUser",{
                            ...resp, //解构resp，即将resp里的(key,value)对解构出来
                            is_login: true,
                        });
                        data.success(resp); //成功的话则调用回调函数
                    } else {
                        data.error(resp);
                    }
                },
                error(resp){
                console.log(resp);
                }
            });
        },
        
        logout(context){
            localStorage.removeItem("jwt_token"); //将token从内存中删去
            context.commit("logout");
        }
    
    },
    modules: {
    }
}