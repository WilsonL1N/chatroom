<template>
    <div>
        <div class="popup_box">
            <div class="field name">
                <div class="hint">Room Name:</div>
                <input id="room_name" class="input" v-model="room.name" placeholder="" maxlength="12" @blur="checkRoomName(room.name)">
                <div class="error_hint" v-show="isErrorName">{{errorInfoName}}</div>
            </div>
            <div class="field private">
                <input type="checkbox" id="room_private" v-model="room.isPrivate">
                <label for="room_private">Private</label>
            </div>
            <div class="field password" v-show="room.isPrivate">
                <div class="hint">Password:</div> 
                <input id="room_password" type="password" class="input" v-model="room.password" placeholder="" maxlength="16" @blur="checkPassword(room.password)">
                <div class="error_hint" v-show="isErrorPassword">{{errorInfoPassword}}</div>
            </div>
            <div class="field_confirm">
                <button class="confirm_button" @click="confirm">Create Room</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user'],
    data: function(){
        return {
            room: {
                name: this.user.name + "'s room",
                password: "",
                isPrivate: false,
            },
            errorInfoName: "",
            errorInfoPassword: "",
            isErrorName: false,
            isErrorPassword: false,
        }
    },
    methods: {
        checkRoomName: function(name) {
            return name
        },
        checkPassword: function(password) {
            if (password.length<6) {
                this.errorInfoPassword = "The length of password can not be less than 6."
                this.isErrorPassword = true
            }
            else if (/[^\w]+/.test(password)) {
                this.errorInfoPassword = "Invalid password. It can only be consisted of a-z, A-Z, 0-9, and '_'."
                this.isErrorPassword = true
            } else {
                this.isErrorPassword = false
            }
        },
        confirm: function() {
            this.$emit('createRoom',this.room)
        }
    }
}
</script>

<style>

</style>