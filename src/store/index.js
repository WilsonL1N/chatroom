import { createStore } from "vuex";
import main from "../main";

export default createStore({
    state: {
        socket: {
        isConnected: false,
        message: "",
        reconnectError: false,
        heartBeatInterval: 50000,
        heartBeatTimer: 0
        }
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            main.config.globalProperties.$socket = event.currentTarget;
            state.socket.isConnected = true;
            console.log('connection opened:' + new Date())
            // // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
            // state.socket.heartBeatTimer = setInterval(() => {
            //     const message = "heart beats";
            //     state.socket.isConnected && 
            //     main.config.globalProperties.$socket.sendObj({
            //         code: 200,
            //         msg: message
            //     });
            // }, state.socket.heartBeatInterval);
        },
        
        SOCKET_ONCLOSE(state, event) {
            state.socket.isConnected = false;
            // // 连接关闭时停掉心跳消息
            // clearInterval(state.socket.heartBeatTimer);
            // state.socket.heartBeatTimer = 0;
            console.log("connection closed: " + new Date());
            console.log(event);
        },
        
        SOCKET_ONERROR(state, event) {
            console.error(state, event);
        },
        
        SOCKET_ONMESSAGE(state, message) {
            console.log(JSON.parse(message.data))
            state.socket.message = message;
        },
        
        SOCKET_RECONNECT(state, count) {
            console.info("reconnecting...", state, count);
        },
        
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        }
    },
    modules: {}
});