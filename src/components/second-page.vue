<template>
    <div>
        <transition enter-active-class="fade-in-active" leave-active-class="fade-out-active">
            <keep-alive>
                <router-view class="second-container"/>
            </keep-alive>
        </transition>
    </div>
</template>

<style lang='scss' scoped>
.fade-in-active{
    animation:inActiveAnimate 0.3s;
}
.fade-out-active{
    animation:outActiveAnimate 0.3s;
}
@keyframes inActiveAnimate {
    0% {
        transform: translateX(100%);
        opacity: 1;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
}
@keyframes outActiveAnimate {
    0% {
        transform: translateX(0px);
        opacity: 1;
    }
    100% {
        transform: translateX(100%);
        opacity: 1;
    }
}
.second-container{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 100;
  overflow-y: auto;
}
</style>