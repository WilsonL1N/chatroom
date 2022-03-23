<template>
    <div class="room_item">
        <div class="top_bar">
            <div class="room_name">{{room.name}}</div>
            <div class="enter_button" @click="enterRoom(room.roomId)">Enter</div>
        </div>
        <div class="room_discription">{{room.discription}}</div>
    </div>
</template>

<script>
export default {
    props: ['roomInfo', 'userInfo'],
    data: function() {
        return {
            room: this.roomInfo,
            user: this.userInfo,
        }
    },
    methods: {
        enterRoom: function(id) {
            console.log(id)
            // this.$route.push({
            //     path:'/room/'+id,
            //     params: {
            //         user: this.user
            //     }
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
.room_item {
    height: 100px;
    width: 380px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid;
    border-radius: 16px;
    margin-bottom: 20px;
    padding: 10px;
    &:hover {
        border: 1px solid rgb(3, 187, 122);
    }

    .top_bar {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    
        .room_name {
            height: 30px;
            font-size: 26px;
            margin-bottom: 10px;
        }

        .enter_button {
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

    .room_discription {
        height: 60px;
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 20px;
        letter-spacing: 0;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
}
</style>