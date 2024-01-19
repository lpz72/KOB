export default{
    state: {
        status: "matching", //matching表示正在匹配，pking表示正在对战
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        gamemap: null,
       },
    getters: {
    },
    mutations: {
        updateStatus(state,status){
            state.status = status;
        },
        updateSocket(state,socket){
            state.socket = socket;
        },
        updateOpponent(state,opponent){
            state.opponent_username = opponent.username;
            state.opponent_photo = opponent.photo;

        },
        updateGamemap(state,gamemap){
            state.gamemap = gamemap;

        }
      
    },
    actions: {
    
    },
    modules: {
    }
}