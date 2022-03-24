<template>
    <div>
        <div class="mask"></div>
        <div class="enter_popup_box">
            <div class="top_bar">
                <div class="back" @click="back"><img :src="backIcon"></div>
                <div class="name">{{room.name}}</div>
            </div>
            <div class="discription">{{room.discription||"No Discription Here."}}</div>
            <div class="input_box" v-show="room.private">
                <div class="info_hint">Password:</div> 
                <input id="enter_room_password" type="password" class="info_input" v-model="inputPassword" placeholder="" maxlength="16">    
                <div class="error_hint" v-show="isErrorPassword">
                    <img :src="errorIcon">
                </div>
            </div>
            <div class="confirm">
                <div class="confirm_button" :class="[isCanConfirm? 'confirm_button-available':'confirm_button-disable']" @click="confirm">Enter Room</div>
            </div>
        </div>
    </div>
</template>

<script>
import backIcon from '@/assets/pic/back-button.png'
import errorIcon from '@/assets/pic/cancel.png'
import { enterRoom } from '../api/api.js'

export default {
    props: ["roomDetail","userDetail"],
    emits: ["closeEnter"],
    data: function() {
        return {
            backIcon,
            errorIcon,
            user: this.userDetail,
            room: this.roomDetail,
            inputPassword: "",
            isErrorPassword: false,
            errorInfoPassword: "Incorrect Password."
        }
    },
    methods: {
        back: function() {
            this.$emit("closeEnter")
        },
        confirm: function() {
            if (!this.isCanConfirm) return false
            let param = this.room
            param.password = this.inputPassword
            let _this = this
            enterRoom(param).then(res=>{
                console.log(res)
                if (res.data.status=="0") {
                    _this.$router.push({
                        path: "/chatRoom",
                        name: "chatRoom",
                        params: {
                            roomId: _this.room.roomId,
                            user: _this.user
                        }
                    })
                } else {
                    _this.isErrorPassword = true
                    _this.errorInfoPassword = res.data.msg
                }
            }).catch(res=>{
                console.log(res)
            })
        },
    },
    computed: {
        isCanConfirm() {
            if (!this.room.private || this.inputPassword.length>0) {
                return true
            } else {
                return false
            } 
        }
    },
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
.enter_popup_box {
    position: absolute;
    width: 500px;
    // height: 300px;
    padding: 20px;
    margin: auto;
    // border: 1px solid;
    top: calc(50% - 190px);
    left: calc(50% - 270px);
    border-radius: 20px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color: rgb(255,255,255);

    .top_bar {
        width: 100%;
        height: 40px;
        margin-bottom: 10px;

        .back {
            position: absolute;
            margin: 10px;
            width: 20px;
            height: 20px;
            z-index: 1;
            img {
                width: 20px;
                height: 20px;
            }
            &:hover {
                cursor: pointer;
            }
        }

        .name {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 24px;
            font-weight: 700;
            text-align: center;
        }
    }

    .discription {
        width: calc(100% - 40px);
        text-align: center;
        word-wrap: wrap;
        line-height: 30px;
        font-size: 16px;
        padding: 20px;
    }

    .input_box {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
        padding: 20px;
        width: calc(100% - 40px);

        .info_hint {
            margin-left: 62px;
            width: 85px;
            height: 20px;
            font-size: 16px;
        }

        .info_input {            
            width: 150px;
            height: 22px;
            font-size: 16px;
            padding: 4px 8px;
        }

        .error_hint {
            margin: 10px;
            width: 20px;
            height: 20px;

            img {
                width: 20px;
                height: 20px;
            }
        }
    }

    .confirm {
        width: 100%;
        
        .confirm_button {
            width: 100px;
            height: 30px;
            padding: 4px 8px;
            border-radius: 6px;
            border: 1px solid;
            margin: auto;
            line-height: 30px;
            text-align: center;

            &-disable {
                background-color: rgb(144,144,144);
                color: rgb(255,255,255)
            }

            &-available {
                background-color: rgb(3, 187, 122);
                color: rgb(255,255,255);
                &:hover {
                    cursor: pointer;
                    background-color: rgb(9, 121, 82);
                }
            }
        }
    }
}
</style>