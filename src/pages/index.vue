<template>
    <div class="page">
        <lg-header></lg-header>
        <scroller class="scroll"> 
            <sticky :check-sticky-support="false" :offset="0" style="display:none">
                <tab  v-model="tabModel" class="tabNav" bar-active-color="#7bd3d0" active-color="#070707">
                    <tab-item @on-item-click="onItemClick">水表</tab-item>
                    <tab-item @on-item-click="onItemClick">电表</tab-item>
                </tab>
            </sticky>
           <div class="lg-switcher">
                <popup-picker :data="towerData.list" v-model="towerData.value" :columns="1" class="lg-picker1" @on-change="towerChange"></popup-picker>
                <popup-picker :data="cellData.list" v-model="cellData.value" :columns="1" class="lg-picker1 lg-picker2" @on-change="cellChange"></popup-picker>
           </div>
            <div>
                <cell :class="i.watchNumber !=null ?'lg-cell lg-cell-color':'lg-cell'" :title="i.roomNumber"  v-for="i in roomList"   @click.native="cellClick(i.roomId)" 
                :value="i.watchNumber !=null ? i.watchNumber+Unit: i.remark" >
                </cell>  
            </div>
            <div>
            </div>
        </scroller > 
        <second-page></second-page>
    </div>
</template>

<script>
import {roomListRequest,getTowerListRequest,getCellListRequest} from '@/utils/api'
import header from '@/components/header.vue'
import secondPage from '@/components/second-page'
import {Tab,TabItem,Sticky,PopupPicker,Cell} from 'vux'
export default {
    data () {
        return {
            tabModel:0,
            Unit:'吨',
            towerData:{
                list:[],
                value:['楼号 ▼'],
            },
            cellData:{
                list:[],
                value:['单元 ▼'],
            },
            cellParam:{   //单元列表参数
                villageId:0,
                towerId:''
            },
            roomData : {    //房间列表参数
                feeType: 'water',
                propertyId:0,
                cellId:'',
            },
            roomList:[],   //房间列表,
        };
    },
    components: {
        'lg-header':header,
        Tab,
        TabItem,
        Sticky,
        PopupPicker,
        Cell,
        secondPage,
    },
    watch:{
        $route( to , from ){   
            if(from.path == '/detail'){
                var cell = JSON.parse(localStorage.getItem('cell'));
                if(cell){
                    for(var i of this.roomList){
                        if(i.roomId == cell.roomId){
                            // this.isCoor = true;
                            i.watchNumber = cell.watchNumber;
                            i.remark = cell.remark;
                        }
                    }
                }
            }
        }
    },
    created() {
        window.newName = this.newName;
        // this.getTowerList();
    },
    // mounted() {
    //     this.token= 8;
    //     window.newName = this.newName; 
    //     window.a = this.a;
    // },
    methods: {
        //与安卓，ios,java的通信方法
        newName (propertyId,villageId,userId,tokenId)  {
            this.roomData.propertyId  = propertyId;
            this.cellParam.villageId = villageId;
            window.localStorage.setItem('propertyId',propertyId);
            window.localStorage.setItem('villageId',villageId);
            window.localStorage.setItem('token',tokenId);
            window.localStorage.setItem('userId',userId);
            this.getTowerList();
         },
        //获取楼号列表
        getTowerList(){
            this.token = 9;
            this.cellParam.villageId = window.localStorage.getItem('villageId');
            getTowerListRequest({'villageId':this.cellParam.villageId}).then(res=>{
                var data = res.data;
                this.towerData.list = [];
                for (var i = 0; i < data.length; i++) {
                    this.towerData.list.push({
                        'id':data[i].id,
                        'portionId':data[i].portionId,
                        'villageId':data[i].villageId,
                        'value':data[i].portionName+data[i].towerNumber,
                        'name':data[i].portionName+data[i].towerNumber,
                    })
                }
            })
        },
        a () {
            this.token = 77;
        },
        //获取单元列表
        getCellList(){
            getCellListRequest(this.cellParam).then(res=>{
                var data = res.data;
                this.cellData.list = [];
                 for (var i = 0; i < data.length; i++) {
                    this.cellData.list.push({
                        'id':data[i].id,
                        'portionId':data[i].portionId,
                        'villageId':data[i].villageId,
                        'value':data[i].cellName,
                        'name':data[i].cellName,
                    })
                }
            })
        },
        //选择楼号
        towerChange(value){
            this.towerData.value = value;
            for(var i of this.towerData.list){
                if(i.value == value){
                    this.cellParam.towerId = i.id;
                }
            }
            this.roomList = [];
            this.cellData.value[0] = '单元 ▼';
            this.getCellList();
             
        },
        //选择单元
        cellChange(value){
            this.cellData.value = value;
            for(var i of this.cellData.list){
                if(i.value == value){
                    this.roomData.cellId = i.id;
                }
            }
            this.roomListRe();
        },
        //获取房间列表
        roomListRe(){
            this.roomData.propertyId = window.localStorage.getItem('propertyId');
            roomListRequest(this.roomData).then(res=>{
                //  alert(1)
                this.roomList = res.data;
                // console.log( this.roomList)
            })
        },
        //选择水电表
        onItemClick(index){
            if(index == 0){
                this.Unit = '吨';
                this.roomData.feeType = 'water';
            }else{
                this.Unit = '度';
                this.roomData.feeType = 'ammeter';
            }
             this.roomListRe();
            // if (this.towerData.value[0] == '楼号 ▼' && this.cellData.value[0] == '单元 ▼') {
            //     return
            // } else {
            //     this.roomListRe();
            // }
        },
        cellClick(id){
            localStorage.setItem('roomName',this.towerData.value+this.cellData.value);
            this.$router.push({path:'/detail',query:{roomId:id,type:this.tabModel}});
        },
    }
}
//   window['newName'] = function(propertyId,villageId,userId,tokenId){
//     this.token = 5;
// 	window.localStorage.setItem('propertyId',propertyId);
//     window.localStorage.setItem('villageId',villageId);
//      window.localStorage.setItem('token',tokenId);
//     window.localStorage.setItem('userId',userId);
//      this.getTowerList();
//     }

</script>

<style lang='scss' scoped>
.lg-picker1{
    display: inline-block;
    padding: 18px 0;
    text-align: center;
    // margin-top: 15px;
    font-size: 18px;
    margin-right: 3%;
}
.lg-picker2{
    margin-left: 3%;
    font-size: 18px;
}
.lg-cell {
    border-bottom: 1px solid #ededed;
    // margin-top: 10px;
    font-size: 0.45rem;
    height: 1.75rem;
}
.lg-cell-color {
    color:#9B9B9B;
}
.tabNav {
    width: 60%;
    margin-left: 20%;
}
</style>
<style lang="scss">
.lg-picker .vux-popup-picker-value{
    display: block;
    text-align:center !important;
}
.vux-cell-box:not(:first-child):before{
    height: 0 !important;
    border-top: 0 !important;
}
.lg-switcher {
    border-bottom: 1px solid #ccc;
    display: flex !important;
    align-items:center;
    justify-content:center;
}
.weui-cell {
    padding: 10px 18px !important;
}
.vux-picker {
    height: 240px;
}
</style>
