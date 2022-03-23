<template>
    <div v-show="isShow">
        <transition name="fade">
            <section>
                <div class="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                </div>
            </section>
        </transition>
    </div>
</template>
<script>
export default {
    props: {
        isShow: Boolean
    }
}
</script>
<style scoped lang="css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.loading {
    width: 100%;
    text-align: center;
    /* flex-direction: column; */
}
.loading span{
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: lightgreen;
    animation: load 1s ease infinite;
    margin-left: 5px;
}
@keyframes load{
    0%,100%{
        height: 40px;
        background: lightgreen;
    }
    50%{
        height: 70px;
        margin: -15px 0;
        background: lightblue;
    }
}
.loading span:nth-child(2){
    animation-delay:0.2s;
}
.loading span:nth-child(3){
    animation-delay:0.4s;
}
.loading span:nth-child(4){
    animation-delay:0.6s;
}
.loading span:nth-child(5){
    animation-delay:0.8s;
}
</style>