<template>
    <div class="signin_box">
        <div>
            <div class="input_box">
                <div class="info_hint">Username:</div>
                <input id="nameinput" class="info_input" v-model="user.name" placeholder="" maxlength="8">
                <div class="error_hint" v-show="isErrorName">{{errorInfoName}}</div>
            </div>
            <div class="input_box">
                <div class="info_hint">Password:</div> 
                <input id="passwordinput" type="password" class="info_input" v-model="user.password" placeholder="" maxlength="12">
                <div class="error_hint" v-show="isErrorPwd">{{errorInfoPwd}}</div>
            </div>    
        </div>
        
        <div class="button_box">
            <div class="signup link" @click="signup">Sign up</div>
            <div class="signin button" @click="signin">Sign in</div>
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
                this.isloading = true
                login(params).then(res=>{
                    this.isloading = false
                    // console.log(res)
                    let data = res.data
                    if (data.status=="0") {
                        // userinfo
                        // name, uid:res.data.uid
                        this.$router.push("/waitingRoom")
                    } else if (data.status=="-1") {
                        this.isErrorName = true
                        this.errorInfoName = data.msg
                    } else if (data.status=="-2") {
                        this.isErrorPwd = true
                        this.errorInfoPwd = data.msg
                    } else {
                        this.isErrorPwd = true
                        this.isErrorPwd = "Invalid username or password."
                    }
                    
                }).catch(res=>{
                    this.isloading = false
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
    text-align: left;
    width: 300px;
    height: 200px;
    margin: auto;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border: 1px solid;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .input_box {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;

        .info_hint {
            width: 100%;
            height: 20px;
            font-size: 12px;
        }

        .info_input {            
            width: calc(100% - 8px);
            height: 22px;
            font-size: 16px;
            padding: 4px;
        }

        .error_hint {
            font-size: 8px;
            color: red;
        }
    }

    .button_box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

        .signup {
            font-size: 12px;
            color: #0088ce;
            height: 20px;
        }

        .link {
            text-decoration: underline;
            &:hover {
                text-decoration: none;
                cursor: pointer;
            }
        }

        .signin {
            height: 24px;
            font-size: 16px;
            color: white;
            background-color: blue;

            &:hover {
                background-color: #0088ce;
            }
        }

        .button {
            padding: 4px 8px;
            border-radius: 6px;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>