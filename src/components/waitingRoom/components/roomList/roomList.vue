<template>
    <div class="room_list">
        <div class="search_bar">
            <input class="search_input" v-model="search_Input">
        </div>
        <room-item v-for="room in rooms" :key="room.id" :roomInfo="room" :user="userInfo"></room-item>
    </div>
    <add-room v-show="isShowAdd" :user="userInfo" @createRoom="create"></add-room>
</template>

<script>
import roomItem from './components/roomItem.vue'
import addRoom from './components/addRoom.vue'

export default {
    data: function() {
        return {
            rooms: [],
            user: {},
            isShowAdd: false,
            searchInput: "",
        }
    },
    components: {
        roomItem,
        addRoom,
    },
    methods: {
        create: function(data) {
            return data
            //this.refreshList()
        },
        refreshList: function() {
            
        }
    }
}
</script>

<style>

</style>