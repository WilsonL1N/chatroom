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
            console.log(JSON.stringify({"content":this.inputData}))
            if (this.inputData.length>0) {
                this.$emit('sendData', this.inputData)
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.input_area {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    textarea {
        border: none;
        width: 524px;
        height: 80px;
        font-size: 16px;
        line-height: 20px;
        padding: 0 8px;
        &:focus {
            outline: none !important;
            border: none;
            box-shadow: none;
        }
    }

    .send_button {
        width: 60px;
        height: 20px;
        padding: 4px 8px;
        border-radius: 6px;
        margin-top: 10px;
        border: 1px solid;
        line-height: 20px;
        text-align: center;
        color: rgb(255,255,255);
        background-color: rgb(3,187,122);

        &:hover {
            color: rgb(255,255,255);
            background-color: rgb(3,187,187);
            cursor: pointer;
        }
    }
}
</style>