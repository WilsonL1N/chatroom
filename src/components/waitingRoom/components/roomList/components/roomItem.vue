<template>
    <div class="room_item" @click="gotoRoom(room.id)">
        <div class="room_name">{{room.name}}</div>
        <div class="room_member">{{room.members}}</div>
    </div>
</template>

<script>
export default {
    props: ['roomInfo', 'userInfo'],
    data: function() {
        return {
            room: this.roomData,
            user: this.userInfo,
        }
    },
    methods: {
        gotoRoom: function(id) {
            this.$route.push({
                path:'/room/'+id,
                params: {
                    user: this.user
                }
            })
        }
    }
}
</script>

<style>

</style>