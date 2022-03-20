<template>
    <room-list></room-list>
    <chat-room></chat-room>
</template>

<script>
import roomList from './components/roomList/roomList.vue'
import chatRoom from './components/chatRoom/chatRoom.vue'

export default {
    components: {
        roomList,
        chatRoom,
    }
}
</script>

<style>

</style>