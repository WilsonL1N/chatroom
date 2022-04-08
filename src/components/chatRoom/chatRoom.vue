<template>
    <div class="chat_room">
        <div class="member_list">
            <div class="title">Room Members</div>
            <!-- <div class="search"></div> -->
            <div class="list">
                <div v-for="member in memberList" :key="member.uid" class="member">{{member.name}}</div>
            </div>
            <div class="button_box">
                <div class="button" @click="leaveRoom">Leave</div>
            </div>
        </div>
        <div class="chat_display">
            <div class="content_display">
                <div class="title">{{roomName}}</div>
                <div id="msg_list" class="content_area">
                    <chat-content v-for="msg in msgList" :key="msg" :user="user" :chatContent="msg"></chat-content>
                </div>
            </div>
            <input-area @sendData="sendData" @uploadimg="uploadimg" class="input_area"></input-area>
        </div>
        
    </div>
</template>

<script>
import chatContent from './components/chatContent.vue'
import inputArea from './components/inputArea.vue'
import time_format from '@/assets/js/data_format'
import { subPic, concatPic } from '@/assets/js/pic_data_process'

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
            arrayBuffer: {}
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
        uploadimg: function(data) {
            let data_seg = subPic(data,1024)
            let len = data_seg.length
            let curr_time = time_format(new Date())
            for (let i=0; i<len; i++) {
                let segment = {
                    total: len,
                    current: i+1
                }
                //sendToServer(data)
                let msg = {
                    type: 2,
                    user: this.user,
                    content: data_seg[i],
                    segment: segment,
                    time: curr_time
                }
                // console.log(i,msg)
                this.$socket.send(JSON.stringify(msg))
            }
            
        },
        getMemberList: function(roomId) {
            this.memberList.push(this.user)
            console.log(roomId)
        },
        leaveRoom: function() {
            this.$router.push({
                path:"/waitingRoom",
                name: "waitingRoom",
                params: {
                    uid: this.user.uid,
                    name: this.user.name,
                }
            })
        }
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
                if (data.type == 2) {
                    let temp = data.user.name+data.time
                    if (temp in this.arrayBuffer) {
                        this.arrayBuffer[temp].push(data.content)
                        if (this.arrayBuffer[temp].length == data.segment.total) {
                            let msg = {
                                who: data.user.uid == this.user.uid?0:1,
                                type: 2,
                                user: data.user,
                                content: concatPic(this.arrayBuffer[temp]),
                                time: data.time
                            }
                            this.msgList.push(msg)
                            delete this.arrayBuffer[temp]
                            this.$nextTick(()=>{
                                let container = this.$el.querySelector("#msg_list")
                                container.scrollTop = container.scrollHeight
                            })
                            return
                        }
                    } else {
                        this.arrayBuffer[temp] = []
                        this.arrayBuffer[temp].push(data.content)
                        return
                    }
                } else {
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
                }
            })
        },
        // msgList: function() {
        //     this.$nextTick(()=>{
        //         let container = this.$el.querySelector("#msg_list")
        //         container.scrollTop = container.scrollHeight
        //     })
        // },


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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .member_list {
        background-color: rgb(255,255,255);
        width: 280px;
        height: 600px;
        border-left: 1px solid rgb(168,168,168);
        border-top: 1px solid rgb(168,168,168);
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
            text-decoration: underline;
        }

        .list {
            height: calc(100% - 140px);
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
        .button_box {
            height: 40px;
            width: calc(100% - 60px);
            margin: auto;

            .button {
                width: 100%;
                height: 22px;
                padding: 4px 0;
                font-size: 16px;
                text-align: center;
                color: white;
                background-color: rgb(245, 58, 58);
                border-radius: 8px;

                &:hover {
                    background-color: rgb(187, 21, 3);
                    cursor: pointer;
                }
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
            background-color: rgb(255,255,255);
            width: 520px;
            height: 400px;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 1px solid rgb(168,168,168);
            border-top: 1px solid rgb(168,168,168);
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
                text-decoration: underline;
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
            background-color: rgb(255,255,255);
            width: 540px;
            height: 118px;
            padding: 10px;
            border-left: 1px solid rgb(168,168,168);
            border-top: 1px solid rgb(168,168,168);
            border-radius: 20px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }
    }
}
</style>