<template>
    <div class="chat_room">
        <div class="member_list">
            <div class="title">Room Members</div>
            <!-- <div class="search"></div> -->
            <div class="list">
                <div v-for="member in memberList" :key="member.uid" class="member">{{member.name}}</div>
            </div>
        </div>
        <div class="chat_display">
            <div class="content_display">
                <div class="title">{{roomName}}</div>
                <div id="msg_list" class="content_area">
                    <chat-content v-for="msg in msgList" :key="msg" :user="user" :chatContent="msg"></chat-content>
                </div>
            </div>
            <input-area @sendData="sendData" class="input_area"></input-area>
        </div>
        
    </div>
</template>

<script>
import chatContent from './components/chatContent.vue'
import inputArea from './components/inputArea.vue'
import time_format from '@/assets/js/data_format'

export default {
    data: function(){
        return {
            memberList: [],
            msgList: [],
            user: {
                uid: "",
                name: ""
            },
            roomId: "",
            roomName: "",
        }
    },
    components: {
        chatContent,
        inputArea,
    },
    methods: {
        initWebSocket(roomId) {
            this.$connect(`ws://localhost:8081/msgWebsocket/${roomId}`)
        },
        sendData: function(data) {
            //sendToServer(data)
            let msg = {
                type: 0,
                user: this.user,
                content: data,
                time: time_format(new Date())
            }
            this.$socket.send(JSON.stringify(msg))
        },
        getMemberList: function(roomId) {
            this.memberList.push(this.user)
            console.log(roomId)
        },
    },
    mounted() {
        this.user.uid = this.$route.params.uid || "1"
        this.user.name = this.$route.params.name || "Alice"
        this.roomId = this.$route.params.roomId || "1"
        this.roomName = this.$route.params.roomName || "Alice's room"
        this.getMemberList(this.roomId)
        this.initWebSocket(this.roomId)
    },
    computed: {
        newMsg () {
            return this.$store.state.socket.message.data
        }
    },
    watch: {
        newMsg(){
            this.$nextTick(()=>{
                let data = JSON.parse(this.newMsg)
                if (data.type == 1) {
                    data.who = 2
                } else {
                    if (data.user.uid == this.user.uid) {
                        data.who = 0
                    } else {
                        data.who = 1
                    }
                }
                console.log(data)
                this.msgList.push(data)
                this.$nextTick(()=>{
                    let container = this.$el.querySelector("#msg_list")
                    container.scrollTop = container.scrollHeight
                })
            })
        },
        msgList: function() {
            this.$nextTick(()=>{
                let container = this.$el.querySelector("#msg_list")
                container.scrollTop = container.scrollHeight
            })
        },


    },

    beforeUnmount() {
        this.$disconnect()
    }
}
</script>

<style lang="scss" scoped>
.chat_room{
    width: 900px;
    height: 600px;
    padding: 20px;
    margin: auto;
    // border: 1px solid;
    // border-radius: 20px;
    // box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color: rgb(255,255,255);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .member_list {
        width: 280px;
        height: 600px;
        border: 1px solid;
        border-radius: 20px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

        .title{
            width: 100%;
            height: 40px;
            margin: 20px 0;
            font-size: 24px;
            line-height: 40px;
            font-weight: 700;
            text-align: center;
        }

        .list {
            height: calc(100% - 100px);
            width: calc(100% - 60px);
            padding: 0 30px 20px 30px;
            overflow-x: hidden;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }

            .member{
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                font-weight: 500;
                text-align: left;
            }
        }
    }

    .chat_display {
        width: 560px;
        height: 600px;
        padding: 0 20px;
        margin-left: 20px;
        // border: 1px solid;
        // border-radius: 20px;
        // box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

        .content_display {
            width: 520px;
            height: 400px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid;
            border-radius: 20px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

            .title{
                width: 100%;
                height: 40px;
                margin-bottom: 20px;
                font-size: 24px;
                line-height: 40px;
                font-weight: 700;
                text-align: left;
            }

            .content_area {
                height: calc(100% - 60px);
                width: 100%;
                padding: 0;
                overflow-x: hidden;
                overflow-y: scroll;

                &::-webkit-scrollbar {
                    display: none;
                }
            }
        }

        .input_area {
            width: 540px;
            height: 118px;
            padding: 10px;
            border: 1px solid;
            border-radius: 20px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }
    }
}
</style>