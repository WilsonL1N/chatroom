<template>
<div>
    <div class="mask"></div>
    <div class="popup_box">
        <div class="top_bar">
            <div class="back" @click="back"><img :src="backIcon"></div>
            <div class="title">Create a Room</div>
        </div>
        <div class="field name">
            <div class="info">
                <div class="hint">Room Name:</div>
                <input id="room_name_add" class="input" v-model="room.name" placeholder="" maxlength="17" @blur="checkRoomName(room.name)">
                <div class="private">
                    <input type="checkbox" id="room_private" v-model="room.isPrivate">
                    <label for="room_private">Private</label>
                </div>
            </div>
            <div class="error_hint" v-show="isErrorName">{{errorInfoName}}</div>
        </div>
        <div class="field password" v-show="room.isPrivate">
            <div class="info">
                <div class="hint">Password:</div>
                <input id="room_password" type="password" class="input" v-model="room.password" placeholder="" maxlength="16" @blur="checkPassword(room.password)">
            </div>
            <div class="error_hint" v-show="isErrorPassword">{{errorInfoPassword}}</div>
        </div>
        <div class="discription">
            <div class="hint">Discription:</div>
            <textarea id="room_discription" class="input_disc" v-model="room.discription" placeholder="No more than 150 characters." maxlength="150" rows="4"></textarea>
        </div>
        <div class="confirm">
            <div class="confirm_button" :class="[isCanConfirm? 'confirm_button-available':'confirm_button-disable']" @click="confirm">Create</div>
        </div>
    </div>
</div>
</template>

<script>
import backIcon from '@/assets/pic/back-button.png'
export default {
    props: ['userInfo'],
    emits: ["closeCreate","createRoom"],
    data: function(){
        return {
            backIcon,
            user: this.userInfo,
            room: {
                name: this.userInfo.name+"'s room",
                password: "",
                isPrivate: false,
                discription: ""
            },
            errorInfoName: "Invalid Name",
            errorInfoPassword: "",
            isErrorName: false,
            isErrorPassword: false,
        }
    },
    methods: {
        checkRoomName: function(name) {
            console.log(name)
        },
        checkPassword: function(password) {
            if (!this.room.isPrivate) {
                this.isErrorPassword = false
                this.room.password = ""
                return
            }
            if (password.length<6) {
                this.errorInfoPassword = "The length of password can not be less than 6."
                this.isErrorPassword = true
            }
            else if (/[^\w]+/.test(password)) {
                this.errorInfoPassword = "Invalid password. It can only be consisted of a-z, A-Z, 0-9, and _"
                this.isErrorPassword = true
            } else {
                this.isErrorPassword = false
            }
        },
        confirm: function() {
            this.checkRoomName(this.room.name)
            this.checkPassword(this.room.password)
            this.$emit('createRoom',this.room)
        },
        back: function() {
            this.$emit('closeCreate')
        }
    },
    computed: {
        isCanConfirm() {
            if ((!this.room.isPrivate || this.room.password.length>0) && !this.isErrorName && !this.isErrorPassword) {
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

.popup_box {
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

        .title {
            position: relative;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 24px;
            font-weight: 700;
            text-align: center;
        }
    }

    .field {
        width: calc(100% - 40px);
        height: 40px;
        margin-bottom: 16px;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .info {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .hint {
                width: 120px;
                height: 30px;
                font-size: 16px;
                line-height: 30px;
                text-align: left;
            }

            .input {
                width: 200px;
                height: 30px;
                padding: 4px 8px;
                font-size: 16px;
                line-height: 40px;
                text-align: left;
                border-radius: 8px;
                border: 1px solid;
            }

            .private {
                margin-left: 8px;
            }
        }

        .error_hint {
            margin-top: 4px;
            margin-left: 120px;
            font-size: 8px;
            color: red;
        }
    }

    .discription {
        width: calc(100% - 40px);
        margin-bottom: 16px;
        padding: 10px 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        .hint {
            width: 120px;
            height: 30px;
            font-size: 16px;
            line-height: 30px;
            text-align: left;
        }

        .input_disc {
            font-size: 16px;
            line-height: 30px;
            width: 240px;
            padding: 4px 8px;
            border-radius: 8px;
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