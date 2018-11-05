<template>
    <div class="page">
        <div class="lg-headerTop" v-show="addUserDialogFormVisible"></div>
        <x-header class="lg-header" :left-options="{showBack: false}">
            <x-icon type="ios-arrow-left" size="30" style="fill:#1b1919; position: absolute; padding-left: 10px;padding-top: 10px;" @click="handhoutui"></x-icon>
            水表抄录</x-header>
        <scroller class="scroll"> 
            <div class="lg-con">
                <div class="row">{{roomName}}{{roomWatch.roomNumber}}</div>
                <div class="number-text">表数：</div>
                <input Type="text"  v-on:input='chanageIn()' placeholder='请输入表数，只能输入数字' @blur.prevent="changeCount()" v-model="roomWatch.watchNumber" class="lg-input">
                <div class="number-text">备注：</div>
                <x-textarea placeholder="备注" class="lg-text" :height="160" v-model="roomWatch.remark"></x-textarea>
                <x-button type="primary" @click.native="submit">确定</x-button>
            </div>
        </scroller>
    </div>
</template>

<script>
import { XTextarea,XButton,XHeader } from 'vux'
import {roomWatchNumberRequest,saveRoomWatchNumberRequest} from '@/utils/api'
export default {
    data () {
        return {
            addUserDialogFormVisible:false,
            roomName:'',
            formData:{
                feeType:'',
                roomId:''
            },
            roomWatch:{
                feeType:'',
                userId:0,
                roomId:0,
                roomNumber:"",
                orderId:1,
                watchNumber:2,
                remark:'修改备注'
            },
            place:'输入水表数',
        };
    },
    components: {
        XTextarea,
        XButton,
        XHeader
    },
    activated () {
        this.init();
    },
     created() {
         var xt = navigator.userAgent;
            if(xt.indexOf("OS") > -1){
                this.addUserDialogFormVisible = true
                }else{
                this.addUserDialogFormVisible = false
            }
    },
    methods: {
         chanageIn: function () {
            if (this.roomWatch.watchNumber !=this.roomWatch.watchNumber.match(/^\d*\.{0,1}\d{0,9}$/)) {
                alert('只能输入数字和小数点')
                // console.log(1)
                this.roomWatch.watchNumber = this.roomWatch.watchNumbe
            }
        },
        changeCount:function () {
            if (this.roomWatch.watchNumber !=this.roomWatch.watchNumber.match(/^\d*\.{0,1}\d{0,9}$/)) {
                alert('只能输入数字和小数点')
                // console.log(2)
                this.roomWatch.watchNumber = this.roomWatch.watchNumbe
            }
        },
        init(){
            this.roomName = localStorage.getItem('roomName');
            var roomId = this.$route.query.roomId;
            var type = this.$route.query.type;
            this.formData.roomId = roomId;
            this.place = type==0?'输入水表数':'输入电表数';
            this.formData.feeType = type==0?'water':'ammeter';
            this.roomWatch.feeType = type==0?'water':'ammeter';
            this.roomWatchNumber();
        },
        roomWatchNumber(){
            roomWatchNumberRequest(this.formData).then(res=>{
                this.roomWatch.orderId = res.data.orderId;
                this.roomWatch.remark = res.data.remark;
                this.roomWatch.roomId = res.data.roomId;
                this.roomWatch.roomNumber = res.data.roomNumber;
                this.roomWatch.watchNumber = res.data.watchNumber;
            })
        },
        submit(){
            this.roomWatch.userId = window.localStorage.getItem('userId');
            saveRoomWatchNumberRequest(this.roomWatch).then(res=>{
                localStorage.setItem('cell',JSON.stringify(
                    {'roomId':this.roomWatch.roomId,
                    'watchNumber':this.roomWatch.watchNumber,
                    'remark':this.roomWatch.remark}));
                console.log(res)
                alert('保存成功');
                window.history.go(-1);
            })
        },
        handhoutui() {
            window.history.go(-1);
        }
    }
}
</script>

<style lang='scss' scoped>
.lg-con{
    padding: .413rem;
    .row{
        border-bottom: 1px solid #cccccc;
        text-align: center;
        margin-bottom: 5px;
        height:50px;
        font-size:20px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:50px;
    }
    .lg-input{
        -webkit-appearance: none;
        width: 100%;
        border-radius: 3px;
        padding: .233rem .513rem;
        margin-top:5px;
        // height: 10%;
        font-size: 20px; 
        box-shadow:0px 0px 5px 0px rgba(191,191,191,0.5);
    }
    .lg-text{
        padding: 12px 15px !important;
        // border: 1px solid #ccc;
        // margin-top: 15px;
        margin-bottom: 30px;
        border-radius: 5px;
        box-shadow:0px 0px 10px 0px rgba(191,191,191,0.5);
    }
    .lg-header{
    // background-color: #26a2ff !important;
    .vux-header-left a{
        color: #fff !important;
    } 
}
}
</style>
<style>
.weui-textarea{
    width: 99% !important;
}
.weui-btn_primary{
    background-color:rgba(252,207,79,1) !important;
}
.number-text {
    width: 66px;
    height: 40px;
    font-size: 16px;
    font-family:PingFangSC-Regular !important;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:40px;
}
input::-webkit-input-placeholder {
       /* placeholder颜色  */
       color: #aab2bd;
       /* placeholder字体大小  */
       font-size: 14px;
       padding-top: 2px;
    }
.lg-headerTop {
  height: 24px;
  width: 100%;
  background: #fff;
}
</style>

