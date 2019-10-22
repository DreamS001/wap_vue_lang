<template>
    <div class="header" id="NavBar">
        <div class="left-box">
            <div class="logo" @click="refresh"></div>
            <div class="select-lang">
                <img class="flag-img" :src="defaultImg" alt="" @click="selectLang">
                <span class="xl-img"></span>
                <div class="lang-box" v-if="langPopup">
                    <ul>
                        <li v-for="(i,index) in langList" :key="index">
                           <!-- <img class="flag-img" src="../../assets/images/img_en.png" alt="">  -->
                           <img class="flag-img" :src="i.src" alt="" @click="getLang(i)" />
                        </li>
                        <!-- <li>
                           <img class="flag-img" src="../../assets/images/img_cn.png" alt="">
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div class="right-box">

            <!-- <div>
                <nx-lang-select class="international right-menu-item"></nx-lang-select>
            </div> -->

            <div @click="userCenter" class="user-img">
                <img :src="user.avatar">
            </div>
            <div class="user-name">
                <!-- <span>账号</span>
                <span>{{user.username}}</span> -->

                <span>{{$t('navbar.title')}}</span>
                <span>{{user.username}}</span>
            </div>
            <div class="nav-icon" @click="showSideBar"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
//语言选择
import nxLangSelect from '@/components/nx-lang-select/index'
import { fpthome } from '@/utils/i18n'// 国际化主题名字

import {switchLang} from '@/api/login'
export default {
    name: 'navBar',
    data(){
        return {
            isShowSideBar:true,
            defaultImg:require('../../assets/images/img_en.png'),
            langList:[{id:1,src:require('../../assets/images/img_en.png'),lang:'en'},{id:1,src:require('../../assets/images/img_cn.png'),lang:'zh'}],
            newLang:'en_US',
            langPopup:false,
        }
    },
    components:{
        nxLangSelect
    },
    computed: {
        ...mapGetters([
            'user',
        ]),
        language() {
            return this.$store.getters.language
        }
    },
    created(){
        console.log(this.$store.getters.language)
        if(this.$store.getters.language=='en'){
            this.defaultImg=require('../../assets/images/img_en.png')
        }else if(this.$store.getters.language=='zh'){
            this.defaultImg=require('../../assets/images/img_cn.png')
        }else{
            this.defaultImg=require('../../assets/images/img_en.png')
        }
    },
    methods: {
        fpthome,
        showSideBar(){
            this.$emit('transfer',this.isShowSideBar)//将值绑定到transfer上传递过去
        },
        userCenter(){
            this.$router.push({path:'/user/center'})
        },
        refresh(){
            location.reload();
        },
        selectLang(){
            this.langPopup=!this.langPopup;
        },
        getLang(e){
            console.log(e)
            this.$i18n.locale = e.lang
            this.$store.dispatch('setLanguage', e.lang)
            if(e.lang=='zh'){
                this.newLang='zh_CN'
            }else{
                this.newLang='en_US'
            }
            switchLang(this.newLang).then(res=>{
                console.log(res)
                if(res.code==200){
                    this.$message({
                        message: 'switch language success',
                        type: 'success'
                    })
                    this.$router.go(0);
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                }
            })
            this.defaultImg=e.src;
            this.langPopup=false;
        }
    },
}
</script>


<style>
    /* #NavBar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    } */
    .header{
        width: 100%;
        height: 100px;
        background: url('../../assets/images/header-bg.png') no-repeat;
        background-size: 100% 100%;
        padding: 26px 30px 26px 50px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }
    .logo{
        width: 102px;
        height: 50px;
        background: url('../../assets/images/img_home_logo.png') no-repeat;
        background-size: 100% 100%;
    }
    .right-box{
        display: flex;
        align-items: center;
    }
    .right-box .user-img{
        width: 50px;
        height: 50px;
        background: url('../../assets/images/img_admin.png') no-repeat;
        background-size: 100% 100%;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .right-box .user-img img{
        width: 100%;
        height: 100%;
    }
    .right-box .user-name{
        height: 100%;
        font-size: 20px;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin: 0 50px 0 20px;
    }
    .nav-icon{
        width: 40px;
        height: 37px;
        background: url('../../assets/images/ic_home_daohang.png') no-repeat;
        background-size: 100% 100%;
    }
    .left-box{
        display: flex;
        align-items: center;
    }
    .select-lang {
        margin-left: 50px;
        display: flex;
        align-items: center;
        position: relative;
    }
    .select-lang .flag-img{
        width: 60px;
        height: 40px;
    }
    .select-lang .xl-img{
        display: block;
        width: 22px;
        height: 12px;
        background: url('../../assets/images/ic_home_top_xl.png') no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
    }
    .select-lang .lang-box{
        position: absolute;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        width:200px;
        height:80px;
        background:rgba(14,30,75,0.4);
        border:1px solid rgba(33,191,252,1);
        box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
        z-index: 999;
    }
    .select-lang .lang-box ul{
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }
</style>
