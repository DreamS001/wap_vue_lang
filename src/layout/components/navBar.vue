<template>
    <div class="header" id="NavBar">
        <div class="logo" @click="refresh"></div>
        <div class="right-box">
            
            <div>
                <nx-lang-select class="international right-menu-item"></nx-lang-select>
            </div>

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
export default {
    name: 'navBar',
    data(){
        return {
            isShowSideBar:true
        }
    },
    components:{
        nxLangSelect
    },
    computed: {
        ...mapGetters([
            'user',
        ]),
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
</style>