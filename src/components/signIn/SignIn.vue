<template>
    <div class="signin_box">
        <div>
            <div class="title">Password&nbsp;&nbsp;Login</div>
            <div class="input_box">
                <!-- <div class="info_hint">Username:</div> -->
                <input id="nameinput" class="info_input" v-model="user.name" placeholder="Account" maxlength="12">
                <div class="error_hint" v-show="isErrorName">{{errorInfoName}}</div>
            </div>
            <div class="input_box">
                <!-- <div class="info_hint">Password:</div>  -->
                <input id="passwordinput" type="password" class="info_input" v-model="user.password" placeholder="Password" maxlength="16" @keyup.enter="signin">
                <div class="error_hint" v-show="isErrorPwd">{{errorInfoPwd}}</div>
            </div>    
        </div>
        
        <div class="button_box">
            <div class="signin button" @click="signin">Login</div>
            <div class="signup link" @click="signup">Register Account</div>
        </div>
    </div>
    <loading-mask :isShow="isloading"></loading-mask>
</template>

<script>

import { login } from "./api/api.js"
import loadingMask from '@/components/loading/loadingMask.vue'

export default {
    components: {
        loadingMask
    },
    data(){
        return {
            user: {
                name: "",
                password: "",
            },
            errorInfoName: "",
            errorInfoPwd: "",
            isErrorName: false,
            isErrorPwd: false,
            isloading: false,
        }
    },
    mounted(){

    },
    methods: {
        signin: function() {
            this.isErrorName = false
            this.isErrorPwd = false
            if (this.user.name == "") {
                this.errorInfoName = "Invalid user name!"
                this.isErrorName = true
            } else {
                let params = {
                    name: this.user.name,
                    password: this.user.password
                }
                let _this = this
                _this.isloading = true
                login(params).then(res=>{
                    _this.isloading = false
                    // console.log(res)
                    let data = res.data
                    if (data.status=="0") {
                        // userinfo
                        // name, uid:res.data.uid
                        _this.$router.push({
                        path:"/waitingRoom",
                        name:"waitingRoom",
                        params: {
                            uid: res.data.uid,
                            name: _this.user.name,
                        }
                    })
                    } else if (data.status=="-1") {
                        _this.isErrorName = true
                        _this.errorInfoName = data.msg
                    } else if (data.status=="-2") {
                        _this.isErrorPwd = true
                        _this.errorInfoPwd = data.msg
                    } else {
                        _this.isErrorPwd = true
                        _this.isErrorPwd = "Invalid username or password."
                    }
                    
                }).catch(res=>{
                    _this.isloading = false
                    // this.errorInfo = res.msg
                    // this.isError = true
                    console.log(res)
                })
            }
        },

        signup: function() {
            this.$router.push('/signup')
        }
    },
}
</script>

<style lang="scss" scoped>
.signin_box {
    background-color: #FFF;
    text-align: left;
    width: 300px;
    height: 270px;
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-left: 1px solid rgb(168,168,168);
    border-top: 1px solid rgb(168,168,168);
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
        width: 126px;
        margin: 0 auto 40px auto;
        padding: 8px 8px;
        border-bottom: 4px solid rgb(3, 187, 122);
        text-align: center;
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
            // margin: auto;
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
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .signup {
            width: 250px;
            font-size: 12px;
            text-align: right;
            color: rgb(3, 187, 122);
            height: 20px;
        }

        .link {
            text-decoration: none;
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        .signin {
            width: 240px;
            height: 24px;
            margin-bottom: 10px;
            font-size: 16px;
            text-align: center;
            color: white;
            background-color: rgb(3, 187, 122);

            &:hover {
                background-color: rgb(14, 142, 97);
            }
        }

        .button {
            padding: 4px 8px;
            border-radius: 16px;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>