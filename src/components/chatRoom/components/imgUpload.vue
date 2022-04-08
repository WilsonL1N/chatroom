<template>
    <div>
        <div class="mask" @click="closeWindow"></div>
        <div class="img_upload">
            <div v-show="!isUpload" class="upload_component">
                <div class="upload_icon" @click="chooseImgHandler">
                    <img :src="uploadIcon" alt="">
                </div>
                <input type="file" accept="image/*" class="upload_image" ref="upload_image" id="upload_image"/>
            </div>
            <div v-show="isUpload" class="preview_component">
                <img :src="img" alt="">
                <div class="close" @click="deleteImg">
                    <img :src="closeIcon" alt="">
                </div>
            </div>
            <div class="send_button" :class="[isUpload?'send_button_able':'send_button_disable']" @click="send">Send Image</div>
        </div>
    </div>
</template>

<script>
import uploadIcon from '@/assets/pic/photo.png'
import closeIcon from '@/assets/pic/close.png'
export default {
    emits: ["closeupload","uploadimg"],
    data() {
        return {
            uploadIcon,
            closeIcon,
            img: '',
            isUpload: false
        }
    },
    methods: {
        chooseImgHandler() {
            this.$refs.upload_image.dispatchEvent(new MouseEvent('click'))
        },
        deleteImg() {
            this.$refs.upload_image.value = ''
            this.isUpload = false
            this.img = ""
        },
        closeWindow() {
            this.$emit("closeupload")
        },
        send() {
            if (this.isUpload) {
                this.$emit("uploadimg", this.img)
                this.deleteImg()
            } else {
                return false
            }
        }
    },
    mounted() {
        let _this = this
        this.$refs.upload_image.addEventListener("change",function(){
            let files =this.files
            let img = new Image()
            let reader =new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload =function(e){
                let dx =(e.total/1024)/1024
                if(dx>=2){
                    alert("文件大小大于2M")
                    return
                }
                img.src =this.result
                _this.img = img.src
                _this.isUpload = true
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color: rgb(0,0,0,0.3);
}

.img_upload {
    position: absolute;
    width: 300px;
    height: 300px;
    padding: 20px;
    margin: auto;
    // border: 1px solid;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    border-radius: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color: rgb(255,255,255);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .upload_component {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        .upload_icon {
            width: 80px;
            height: 80px;
            border: 1px solid #DDD;
            background-color: #FFF;
            border-radius: 8px;
            overflow: hidden;

            &:hover {
                cursor: pointer;
                background-color: #CCC;
            }
            img {
                margin: 10px;
                width: 60px;
                height: 60px;
            }
        }

        .upload_image {
            display: none;
        }
    }

    .preview_component {
        max-width: 300px;
        max-height: 200px;
        min-width: 60px;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .close {
            margin-top: 10px;
            width: 20px;
            height: 20px;

            img {
                width: 20px;
                height: 20px;
            }

            &:hover {
                cursor: pointer;
            }
        }
        img {
            max-width: 300px;
            max-height: 200px;
        }
    }

    .send_button {
        width: 130px;
        height: 20px;
        padding: 4px 8px;
        border-radius: 6px;
        margin-top: 10px;
        border: 1px solid;
        line-height: 20px;
        text-align: center;
        
        &_able {
            color: rgb(255,255,255);
            background-color: rgb(3,187,122);
            &:hover {
                color: rgb(255,255,255);
                background-color: rgb(3,187,187);
                cursor: pointer;
            }
        }

        &_disable {
            color: rgb(10,10,10);
            background-color: #CCC;
            border: 1px solid #BBB;
        }
    }
}
</style>