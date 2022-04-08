<template>
    <div class="input_area">
        <textarea class="input_box" v-model="inputData" @keydown="keyListen"></textarea>
        <div class="button_area">
            <div class="upload_img" @click="showUploadImg">
                <div>Send Image</div>
                <img :src="uploadIcon" alt="">
            </div>
            <div class="send_button" @click="sendData">Send</div>
        </div>
        <img-upload v-show="isShowUpload" @closeupload="hideUploadImg" @uploadimg="uploadimg"></img-upload>
    </div>
</template>

<script>
import uploadIcon from '@/assets/pic/upload.png'
import imgUpload from './imgUpload.vue'
export default {
    emits: ["uploadimg","sendData"],
    components: {
        imgUpload,
    },
    data: function() {
        return {
            uploadIcon,
            inputData: "",
            isShowUpload: false
        }
    },
    methods: {
        uploadimg(data) {
            this.$emit("uploadimg",data)
            this.isShowUpload = false
        },
        showUploadImg() {
            this.isShowUpload = true
        },
        hideUploadImg() {
            this.isShowUpload = false
        },
        sendData: function() {
            if (this.inputData.length>0) {
                this.$emit('sendData', this.inputData)
                this.inputData = ""
            }
        },
        keyListen: function(e) {
            if (e.keyCode === 13) {
                this.sendData()
                e.preventDefault()
                return false
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
    .button_area {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

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

        .upload_img {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            width: 140px;
            height: 20px;
            padding: 4px 8px;
            border-radius: 6px;
            margin-top: 10px;
            margin-right: 20px;
            border: 1px solid;
            line-height: 20px;
            text-align: center;
            color: rgb(10,10,10);
            background-color: #FFF;

            &:hover {
                background-color: #EEE;
                cursor: pointer;
            }

            img {
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>