<template>
    <div class="chat_content" :class="[who?'right':'left']">
        <div class="info" :class="[who?'info_right':'info_left']">
            <div class="name">{{displayValue.user.name}}</div>
            <div class="time">{{displayValue.time}}</div>
        </div>
        <div class="content">{{displayValue.content.value}}</div>
    </div>
</template>

<script>
export default {
    props: ['chatContent','user'],
    data: function() {
        return {
            displayValue: this.chatContent,
            who: this.user.id == this.chatContent.user.id,
        }
    },
    computed: {

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

<style>

</style>