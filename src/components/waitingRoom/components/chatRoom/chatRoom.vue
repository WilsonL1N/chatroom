<template>
    <div class="chat_display">
        <chat-content></chat-content>
    </div>
    <input-area @sendData="sendData"></input-area>
</template>

<script>
import chatContent from './components/chatContent.vue'
import inputArea from './components/inputArea.vue'

export default {
    data: function(){
        return {

        }
    },
    components: {
        chatContent,
        inputArea,
    },
    methods: {
        sendData: function(data) {
            //sendToServer(data)
            return data
        }
    }
}
</script>

<style>

</style>