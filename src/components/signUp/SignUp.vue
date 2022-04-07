<template>
    <div class="signin_box">
        <div>
            <div class="top-bar">
               <div class="back" @click="backToLogin"><img :src="back"></div>
               <div class="title">Register Account</div>
            </div>
            
            <div class="input_box">
                <!-- <div class="info_hint">Username:</div> -->
                <input id="nameinput" class="info_input" v-model="user.name" placeholder="User Name" maxlength="12" @blur="checkName">
                <div class="error_hint" v-show="isErrorName">{{errorInfoName}}</div>
            </div>
            <div class="input_box">
                <!-- <div class="info_hint">Password:</div>  -->
                <input id="passwordinput" type="password" class="info_input" v-model="user.password" placeholder="Password" maxlength="16" @blur="checkPassword">
                <div class="error_hint" v-show="isErrorPassword">{{errorInfoPassword}}</div>
            </div>
            <div class="input_box">
                <!-- <div class="info_hint">Confirm your Password:</div>  -->
                <input id="passwordconfirm" type="password" class="info_input" v-model="confirm_Password" placeholder="Confirm your password" maxlength="16" @blur="checkConfirm">
                <div class="error_hint" v-show="isErrorConfirm">{{errorInfoConfirm}}</div>
            </div>
        </div>
        
        <div class="button_box">
            <button class="signup button" v-bind="{disabled: !isCanConfirm}" @click="register">Register Account</button>
        </div>
    </div>
    <loading-mask :isShow="isloading"></loading-mask>
</template>

<script>

import { signup, checkNameAvailable } from "./api/api.js"
import backIcon from '@/assets/pic/back-button.png'
import loadingMask from '@/components/loading/loadingMask.vue'

export default {
    components: {
        loadingMask
    },
    data(){
        return {
            back: backIcon,
            user: {
                name: "",
                password: "",
            },
            errorInfoName: "",
            errorInfoPassword: "",
            errorInfoConfirm: "Password does not match.",
            isErrorName: false,
            isErrorPassword: false,
            isErrorConfirm: false,
            confirm_Password: "",
            isloading: false,
        }
    },
    mounted(){

    },
    methods: {
        backToLogin: function() {
            this.$router.push("/signin")
        },
        register: function() {
            let res = this.checkInfo()
            if (!res.status) {
                alert(res.msg)
                return false
            }
            let params = {
                name: this.user.name,
                password: this.user.password
            }
            let _this = this
            _this.isloading = true
            signup(params).then(res=>{
                _this.isloading = false
                // console.log(res)
                let data = res.data
                if (data.status=="0") {
                    alert("Account registration succeeded")
                    _this.$router.push({
                        path:"/waitingRoom",
                        name: "waitingRoom",
                        params: {
                            uid: res.data.uid,
                            name: _this.user.name,
                        }
                    })
                } else if (data.status=="-1") {
                    _this.isErrorName = true
                    _this.errorInfoName = data.msg
                } else {
                    alert('Something goes wrong!')
                }
            }).catch(res=>{
                this.isloading = false
                console.log(res)
            })
        },

        checkName: async function() {
            this.isErrorName = false
            if (this.user.name == "") {
                this.errorInfoName = "User name can not be empty."
                this.isErrorName = true
            } else {
                this.isloading = true
                await checkNameAvailable(this.user.name).then(res=>{
                    this.isloading = false
                    console.log(res)
                    if (!res.data.isAvailable) {
                        this.errorInfoName = "This account has been existed."
                        this.isErrorName = true
                    } else {
                        this.isErrorName = false
                    }
                }).catch(res=>{
                    this.isloading = false
                    console.log(res)
                })
            }
            
        },

        checkPassword: function() {
            if (this.user.password.length<6) {
                this.errorInfoPassword = "The length of password can not be less than 6."
                this.isErrorPassword = true
            }
            else if (/[^\w]+/.test(this.user.password)) {
                this.errorInfoPassword = "Invalid password. It can only be consisted of a-z, A-Z, 0-9, and '_'."
                this.isErrorPassword = true
            } else {
                this.isErrorPassword = false
            }
        },

        checkConfirm: function() {
            if (this.user.password == this.confirm_Password) {
                this.isErrorConfirm = false
            } else {
                this.isErrorConfirm = true
            }
        },

        checkInfo: function() {
            this.checkName()
            this.checkPassword()
            this.checkConfirm()
            if (this.user.name == "" || this.isErrorName) {
                return {
                    status: false,
                    msg: "Invalid username!"
                }
            } else if (this.user.password == "" || this.isErrorPassword) {
                return {
                    status: false,
                    msg: "Invalid password!"
                }
            } else if (this.confirm_Password == "" || this.isErrorConfirm) {
                return {
                    status: false,
                    msg: "Password does not match!"
                }
            } else {
                return {
                    status: true,
                    msg: "sign up"
                }
            }
        }
    },
    computed: {
        isCanConfirm() {
            if (!this.isErrorName && !this.isErrorPassword && !this.isErrorConfirm) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.signin_box {
    text-align: left;
    width: 300px;
    min-height: 300px;
    max-height: 370px;
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // border: 1px solid;
    // border-radius: 15px;
    border-left: 1px solid rgb(168,168,168);
    border-top: 1px solid rgb(168,168,168);
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top-bar {
        width: 100%;
        margin-bottom: 40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

        .back {
            height: 20px;
            width: 20px;
            margin-right: 44px;
            
            &:hover {
                cursor: pointer;
            }

            img {
                height: 16px;
                width: 16px;
            }
        }

        .title {
            width: 160px;
            padding: 0px 8px 8px 8px;
            border-bottom: 4px solid rgb(3, 187, 122);
            text-align: center;
        }
    }

    .input_box {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 22px;

        .info_hint {
            width: 100%;
            height: 20px;
            font-size: 12px;
        }

        .info_input {            
            width: calc(80% - 8px);
            height: 22px;
            font-size: 16px;
            padding: 4px;
        }

        input {
            border: none;
            border-bottom: 1px solid rgb(212, 217, 226);

            &:focus {
                border-bottom: 1px solid rgb(212, 217, 226);
                outline: none;
                background-color: transparent;
            }
            &:-webkit-autofill-selected {
                background-color: #FFF;
            }

            &::placeholder {
                color: rgb(194, 199, 207);
                font-size: 12px;
                letter-spacing: 1px;
            }
        }

        .error_hint {
            width: 240px;
            text-align: left;
            font-size: 8px;
            color: red;
        }
    }

    .button_box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-end;

        .signup {
            width: 240px;
            height: 28px;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 21px;
            color: white;
            background-color: rgb(3, 187, 122);

            &:hover {
                background-color: rgb(14, 142, 97);
            }
        }

        .button {
            padding: 4px 8px;
            border-radius: 18px;
            border: 0;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>