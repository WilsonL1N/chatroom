<template>
    <div class="signin_box">
        <div>
            <div class="input_box">
                <div class="info_hint">Username:</div>
                <input id="nameinput" class="info_input" v-model="user.name" placeholder="" maxlength="8">
            </div>
            <div class="input_box">
                <div class="info_hint">Password:</div> 
                <input id="passwordinput" type="password" class="info_input" v-model="user.password" placeholder="" maxlength="12">
                <div class="error_hint" v-show="isError">{{errorInfo}}</div>
            </div>    
        </div>
        
        <div class="button_box">
            <div class="signup link" @click="signup">Sign up</div>
            <div class="signin button" @click="login">Sign in</div>
        </div>
    </div>
</template>

<script>

import { signin } from "./api/api.js"

export default {
    data(){
        return {
            user: {
                name: "",
                password: "",
            },
            errorInfo: "Invalid username or password.",
            isError: false,
        }
    },
    mounted(){

    },
    methods: {
        login: function() {
            if (this.user.name == "") {
                alert("Invalid user name!")
            } else {
                let params = {
                    username: this.user.name,
                    password: this.user.password
                }
                // let _this = this
                signin(params).then(res=>{
                    console.log(res)
                    // _this.$router.push()
                }).catch(res=>{
                    this.errorInfo = res.msg
                    this.isError = true
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