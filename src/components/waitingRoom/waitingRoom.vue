<template>
    <div class="waiting_room">
        <div class="top_bar">
            <div class="title">Keep In Touch</div>
            <div class="search_bar">
                <input class="search_input" v-model="search_input" @keyup.enter="search(search_input)">
                <div class="search_button" @click="search(search_input)">search</div>
            </div>
            <div class="tool_bar">
                <div class="icon" @click="getRoomList"><img :src="refreshIcon"></div>
                <div class="icon" @click="showAdd"><img :src="addIcon"></div>
            </div>
        </div>
        <div class="room_area" v-if="displayRooms.length>0">
            <room-item v-for="room in displayRooms" :key="room.roomId" :roomInfo="room" :userInfo="user" @enterRoom="showEnter"></room-item>
        </div>
        <div class="nodata" v-else>No Data</div>
    </div>
    <add-room v-if="isShowAdd" :userInfo="user" @createRoom="create" @closeCreate="closeCreate"></add-room>
    <enter-room v-if="isShowEnter" :userDetail="user" :roomDetail="roomDetail" @closeEnter="closeEnter"></enter-room>
    <loading-mask :isShow="isloading"></loading-mask>
</template>

<script>
import roomItem from './components/roomItem.vue'
import addRoom from './components/addRoom.vue'
import enterRoom from './components/enterRoom.vue'
import loadingMask from '@/components/loading/loadingMask.vue'
import addIcon from '@/assets/pic/add.png'
import refreshIcon from '@/assets/pic/refresh.png'
import {getRooms, createRoom} from './api/api.js'

export default {
    data: function() {
        return {
            addIcon,
            refreshIcon,
            rooms: [],
            displayRooms: [],
            user: {
                name: "",
                uid: ""
            },
            isShowAdd: false,
            search_input: "",
            isloading: false,
            roomDetail: {},
            isShowEnter: false,
        }
    },
    components: {
        roomItem,
        addRoom,
        enterRoom,
        loadingMask,
    },
    methods: {
        create: function(data) {
            let _this = this
            _this.isloading = true
            createRoom(data).then(res=>{
                _this.isloading = false
                if (res.data.status=="0") {
                    _this.isloading = false
                    _this.isShowAdd = false
                    _this.$router.push({
                        path: "/chatRoom",
                        name: "chatRoom",
                        params: {
                            roomName: data.name,
                            roomId: res.data.roomId,
                            uid: _this.user.uid,
                            name: _this.user.name,
                        }
                    })
                } else {
                    alert(res.data.msg)
                }
            }).catch(res=>{
                _this.isloading = false
                console.log(res)
            })
        },
        closeCreate: function() {
            this.isShowAdd = false
        },
        getRoomList: function() {
            let _this = this
            this.isloading = true
            getRooms().then(res=>{
                _this.isloading = false
                this.rooms = res.data
                this.displayRooms = this.rooms
            }).catch(res=>{
                _this.isloading = false
                console.log(res)
            })
        },
        parseBool: function (val) { return val === true || val === "true" },
        search: function(search) {
            if (search.length==0) {
                this.displayRooms = this.rooms
                return
            }
            this.displayRooms = []
            let reg = new RegExp(search,"ig")
            this.rooms.forEach((item)=>{
                if (item.name.match(reg)) {
                    this.displayRooms.push(item)
                }
            })
            console.log(search)
        },
        showAdd: function() {
            this.isShowAdd = true
        },
        showEnter: function(roomId) {
            this.displayRooms.forEach((item)=>{
                if (item.roomId == roomId) {
                    this.roomDetail = item
                    return
                }
            })
            this.isShowEnter = true
        },
        closeEnter: function() {
            this.isShowEnter = false
        }
    },
    mounted() {
        this.user.uid = this.$route.params.uid || '1'
        this.user.name = this.$route.params.name || 'Alice'
        console.log(this.user)
        this.getRoomList()
    },
}
</script>

<style lang="scss" scoped>
.waiting_room {
    background-color: #FFF;

    width: 900px;
    height: 500px;
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-left: 1px solid rgb(168,168,168);
    border-top: 1px solid rgb(168,168,168);
    border-radius: 15px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    .top_bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 0 20px;

        .title {
            width: 350px;
            height: 50px;
            font-size: 32px;
            line-height: 50px;
        }

        .search_bar {
            height: 40px;
            padding: 4px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .search_input {
                width: 200px;
                height: 26px;
                font-size: 20px;
                padding: 4px 12px;
                border-radius: 20px;
                margin-right: 16px;
            }
            
            input {
                border: 1px solid rgb(144,144,144);
                &:focus {
                    border: 1px solid rgb(144,144,144);
                    outline: none;
                }
            }

            .search_button {
                width: 60px;
                height: 20px;
                padding: 3px;
                border-radius: 8px;
                font-size: 16px;
                // border: 1px solid;
                background-color: rgb(3, 187, 122);
                color: rgb(255,255,255);
                text-align: center;
                line-height: 20px;

                &:hover {
                    background-color: rgb(14, 142, 97);
                    cursor: pointer;
                }
            }
        }

        .tool_bar {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;

            .icon {
                width: 20px;
                height: 20px;
                margin: 10px 10px;
                &:hover {
                    cursor: pointer;
                }

                img {
                    width: 20px;
                    height: 20px;
                }
            }
            
        }
    }

    .room_area {
        width: calc(100% - 20px);
        padding: 0 10px;
        height: 420px;
        overflow-x: hidden;
        overflow-y: scroll;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .nodata {
        width: 120px;
        height: 40px;
        margin: 100px auto;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
    }
}
</style>