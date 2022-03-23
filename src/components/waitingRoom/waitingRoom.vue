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
            <room-item v-for="room in displayRooms" :key="room.roomId" :roomInfo="room" :userInfo="user"></room-item>
        </div>
        <div class="nodata" v-else>No Data</div>
    </div>
    <add-room v-show="isShowAdd" :user="user" @createRoom="create"></add-room>
    <loading-mask :isShow="isloading"></loading-mask>
</template>

<script>
import roomItem from './components/roomItem.vue'
import addRoom from './components/addRoom.vue'
import loadingMask from '@/components/loading/loadingMask.vue'
import addIcon from '@/assets/pic/add.png'
import refreshIcon from '@/assets/pic/refresh.png'
import {getRooms} from './api/api.js'

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
        }
    },
    components: {
        roomItem,
        addRoom,
        loadingMask,
    },
    methods: {
        create: function(data) {
            return data
            //this.refreshList()
        },
        getRoomList: function() {
            let _this = this
            this.isloading = true
            getRooms().then(res=>{
                _this.isloading = false
                console.log(res)
                this.rooms = res.data
                this.displayRooms = this.rooms
            }).catch(res=>{
                _this.isloading = false
                console.log(res)
            })
        },
        parseBool: function (val) { return val === true || val === "true" },
        search: function(search) {
            console.log(search)
        },
        showAdd: function() {
            this.isShowAdd = true
        },
    },
    mounted() {
        this.user.uid = this.$route.params.uid
        this.user.name = this.$route.params.name
        // this.getRoomList()
        this.displayRooms = [{
            roomId:1, isPrivate:false, password: "", name: "abcd", discription:"sdfghjklbfd",
        },{
            roomId:2, isPrivate:true, password: "2345678", name: "alice_room", discription:"rtyuiomnvc",
        },{
            roomId:3, isPrivate:false, password: "", name: "bob_room", discription:"jfioshagire",
        },{
            roomId:4, isPrivate:true, password: "098765", name: "polyu", discription:"",
        },{
            roomId:5, isPrivate:false, password: "", name: "abcd", discription:"sdfghjklbfd",
        },{
            roomId:6, isPrivate:true, password: "2345678", name: "alice_room", discription:"rtyuiomnvc",
        },{
            roomId:7, isPrivate:false, password: "", name: "bob_room", discription:"jfioshagire",
        },{
            roomId:8, isPrivate:true, password: "098765", name: "polyu", discription:"",
        },{
            roomId:9, isPrivate:false, password: "", name: "abcd", discription:"sdfghjklbfd sdfghjklbfd sdfghjklbfd sdfghjklbfd sdfghjklbfd sdfghjklbfd sdfghjklbfd sdfghjklbfdjfioshagire jfioshagire jfioshagire jfioshagire jfioshagire jfioshagire jfioshagire jfioshagire",
        },{
            roomId:10, isPrivate:true, password: "2345678", name: "alice_room", discription:"rtyuiomnvc",
        },{
            roomId:11, isPrivate:false, password: "", name: "bob_room", discription:"jfioshagire",
        },{
            roomId:12, isPrivate:true, password: "098765", name: "polyu", discription:"",
        },]
    },
}
</script>

<style lang="scss" scoped>
.waiting_room {
    width: 900px;
    height: 500px;
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 1px solid;
    border-radius: 15px;

    .top_bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        .title {
            width: 350px;
            height: 50px;
            font-size: 32px;
            line-height: 50px;
        }

        .search_bar {
            height: 40px;
            padding: 4px;
            border-radius: 6px;
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

            .search_button {
                width: 60px;
                height: 20px;
                padding: 3px;
                border-radius: 8px;
                font-size: 16px;
                border: 1px solid;
                background-color: rgb(3, 187, 122);
                color: rgb(255,255,255);
                text-align: center;
                line-height: 20px;

                &:hover {
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
        width: 100%;
        height: 420px;
        overflow-x: hidden;
        overflow-y: scroll;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>