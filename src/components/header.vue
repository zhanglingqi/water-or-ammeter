<template> 
   <div>
  <div class="lg-headerTop" v-show="addUserDialogFormVisible"></div>
    <x-header class="lg-header" @click.native="backNative">
        <span>水表抄录</span>
        <div slot="overwrite-left">
            <x-icon type="ios-arrow-left" size="30" style="fill:#1b1919;position:relative;top:-8px;left:-3px;"></x-icon>
        </div>
    </x-header>
    </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
    data () {
      return {
          addUserDialogFormVisible:false
      }  
    },
    created() {
         var xt = navigator.userAgent;
            if(xt.indexOf("OS") > -1){
                this.addUserDialogFormVisible = true
                }else{
                this.addUserDialogFormVisible = false
            }
    },
    components: {
        XHeader
    },
    methods:{
        // 苹果安卓 返回方法
        backNative () {
            // window.webkit.messageHandlers.backNative.postMessage(null) 苹果
            // window.android.backNative() 安卓
            var xt = navigator.userAgent;
            if(xt.indexOf("OS") > -1){
            window.webkit.messageHandlers.backNative.postMessage(null)
            }else{
            window.android.backNative()
            }
                    }
                }
}
</script>

<style lang="scss">
.lg-header{
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: white !important;
    height: 1.35rem;
    // border-bottom: 3px solid #ccc;
    // color: #9B9B9B !important;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    // font-size: 18px !important;
    font-family:PingFangSC-Regular!important;;
    .vux-header-left a{
        color: black !important;
    } 
}
.vux-header-title {
    color: black !important;
    font-family:PingFangSC-Regular !important;
}
//导航栏适配
.lg-headerTop {
  height: 24px;
  width: 100%;
  background: #ffffff;
}
</style>