<template>
    <div class="content" :class="[msg.who==0?'content_right':'content_left']">
        <div class="info" :class="[msg.who==0?'info_right':'info_left']">
            <div class="name">{{msg.user.name}}</div>
            <div class="time">{{msg.time}}</div>
        </div>
        <div class="image" :class="[msg.who==0?'image_right':'image_left']" v-if="msg.type==2">
            <img :src="msg.content" alt="">
        </div>
        <div class="msg" :class="[msg.who==0?'msg_right':'msg_left']" v-else>{{msg.content}}</div>
    </div>
</template>

<script>
export default {
    props: ['chatContent'],
    data: function() {
        return {
            msg: this.chatContent,
        }
    },
    computed: {

    },
    mounted() {
    }
}

// value{
//     user: {
//         name:,
//         id:
//     },
//     content: {
//         type:,
//         value:,
//     }
//     datetime:
// }
</script>

<style lang="scss" scoped>
.content {
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: flex-start; // flex-end right
    margin-bottom: 10px;

    &_left {
        align-items: flex-start;
    }

    &_right {
        align-items: flex-end;
    }

    .info {
        max-width: 320px;
        display: flex;
        // flex-direction: row; // row-reverse right
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;

        &_left {
            flex-direction: row;
            margin-left: 8px;
        }

        &_right {
            flex-direction: row-reverse;
            margin-right: 8px;
        }

        .name {
            height: 20px;
            line-height: 20px;
        }

        .time {
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            margin: 0 10px;
        }
    }

    .image {
        position: relative;
        max-width: 320px;
        min-width: 30px;
        margin: 6px;
        padding: 6px 12px;

        img {
            max-width: 320px;
        }
    }
    .msg {
        position: relative;
        max-width: 320px;
        min-width: 30px;
        word-wrap: normal;
        margin: 6px;
        padding: 6px 12px;
        font-size: 14px;
        text-align: left;
        line-height: 20px;
        border: 1px solid;
        // border-radius: 14px;
        white-space: pre-line;

        &_left {
            border-radius: 0 14px 14px 14px;
        }
        &_right {
            background-color: #36e3a6;
            border-radius: 14px 0 14px 14px;
            border: none;
        }

        // &_left::before {
        //     content: '';
        //     position: absolute;
        //     top: 50%;
        //     left: -5px;
        //     width: 6px;
        //     height: 6px;
        //     margin-top: -5px;
        //     background: inherit;
        //     transform: rotate(45deg);
        //     border-left: 1px solid;
        //     border-bottom: 1px solid;
        // }

        // &_right::after {
        //     content: '';
        //     position: absolute;
        //     top: 50%;
        //     right: -3px;
        //     width: 6px;
        //     height: 6px;
        //     margin-top: -5px;
        //     background: inherit;
        //     transform: rotate(45deg);
        //     // border-right: 1px solid;
        //     // border-top: 1px solid;
        // }
    }
}

</style>