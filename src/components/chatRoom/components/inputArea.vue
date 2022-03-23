<template>
    <div class="input_area">
        <textarea class="input_box" v-model="inputData"></textarea>
        <div class="send_button" @click="sendData">Send</div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            inputData: "",
        }
    },
    methods: {
        sendData: function() {
            this.$emit('sendData', this.inputData)
        }
    }

}
</script>

<style>

</style>