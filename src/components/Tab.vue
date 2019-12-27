<template>
<!-- 头部 -->
    <div class="read">
        <div class="content">
            <div class="logo">
                <span class="logo-all">
                    <span class="one"></span>
                    <span class="two"></span>
                    <span class="three"></span>
                </span> 
                悦读FM
            </div>
            <div class="title-main">
                <ul>
                    <li v-for='(list,index) in tabs' :key='index' @click='changeTab(list.id)'>
                        <router-link :to="'/'+list.id"  :class="{active:index+1==active}" >{{list.type}}</router-link>
                    </li>
                </ul> 
            </div> 
            <div class="login">
                <span @click="login()">{{go}}</span>
                <span @click="registeript()">注册</span>
            </div>
            <div class="search">
                <input type="text" name="" id="">
                <i class="icon1"></i>
            </div>
        </div> 
        <div class="grey" v-show="show"></div>   
        <!-- 登录 --> 
        <transition name="slide-fade">
            <div class="loginipt" v-if="loginshow">
                <div class="input">
                    <div class="pop-tit">登录</div>
                    <div class="off" @click="off()">×</div> 
                    <div class="form">
                        <div class="email">
                            <input type="text" name="" id="" placeholder="邮箱"  v-model.trim="emailtxt">
                        </div>
                        <div class="password">
                            <input type="password" name="" id="" placeholder="密码" v-model.trim="pswtxt">
                        </div>
                    </div>
                    <div class="account">
                        <label for="" @click="checked()">
                            <input type="checkbox" :checked="choice">
                            下次自动登录
                        </label>
                        <span>忘记密码</span>
                    </div>
                    <button @click="loginmsg()">登录</button> 
                </div>
            </div> 
        </transition>
        <!-- 注册 -->
         <transition name="slide-fade">
            <div class="registeript" v-if="over">
                <div class="input">
                    <div class="pop-tit">注册</div>
                    <div class="off" @click="close()">×</div> 
                    <div class="form">
                        <div class="email">
                            <input type="text" name="" id="" placeholder="昵称" v-model="name">
                        </div>
                        <div class="email">
                            <input type="text" name="" id="" placeholder="邮箱" v-model="email">
                        </div>
                        <div class="email">
                            <input type="password" name="" id="" placeholder="密码" v-model="password">
                        </div>
                        <div class="password">
                            <input type="password" name="" id="" placeholder="确认密码" v-model="verify"> 
                        </div>
                    </div>
                    <div class="reg-account">
                        <label for="">
                            <input type="checkbox" :checked="check" @click="checkeds()">
                            我已认真阅读并同意悦读FM的
                        </label>
                        <span>《使用协议》</span>
                    </div>
                    <button @click="add()">注册</button> 
                </div>
            </div> 
        </transition>
    </div>
</template>
<script>
import axios from 'axios'
import bus from '../bus' 
export default {
    name:"Tab",
    data() {
        return { 
            name:null,
            email:null,
            password:null,
            verify:null,
            active:1, 
            tabs:[],
            number:1, 
            show:false,
            emailtxt:null,
            pswtxt:null,
            loginshow:false,
            over:false,
            choice:'',
            check:null,
            go:"登录"
        }
    },
    created() {
        axios.get("http://localhost:8082/api/types", {
            params: {}
        }).then(res=> {
            this.tabs=this.tabs.concat(res.data.res)  
        }).catch(error=> {
            console.log(error)
        }) 
    }, 
    // articles/:type_id/page/:page 
    methods: {
        changeTab(tab) {    
            this.active=tab  
            bus.$emit('sendId',tab,this.number) 
        },
        login() { 
            if(this.go=="登录") {
                 this.show=true
                this.loginshow=!this.loginshow
            } else {
                window.localStorage.clear()
                this.go="登录"
            } 
        },
        off() { 
            this.show=false
            this.loginshow=!this.loginshow
        },
        registeript() { 
            this.show=true
            this.over=!this.over
        },
        close() { 
            this.show=false
            this.over=!this.over 
        },
        checked() {
            this.choice='checked' 
        },
        // 登录 
        loginmsg() {
            if(this.emailtxt==null||this.pswtxt==null) {
                alert("邮箱或密码不能为空！")
            }else {
                axios.post("http://localhost:8082/api/user/login", {
                    email:this.emailtxt,
                    password:this.pswtxt
                }).then(res=> { 
                    if(res.data.res_code==200) {
                        localStorage.setItem("username",res.data.res.user.nikiname)
                        localStorage.setItem("token",res.data.res.token) 
                        if(this.choice=="checked") {
                            this.emailtxt=res.data.res.user.email
                            this.pswtxt=this.pswtxt
                        }else {
                            this.emailtxt=null
                            this.pswtxt=null
                        }
                        this.loginshow=false
                        this.show=false 
                        this.go="退出"
                    }else {
                        alert("登录失败！")
                    }
                }).catch(error=> {
                    console.log(error)
                })
            }  
        }, 
        checkeds() {
            this.check='checked'
        },
        // 注册 
        add() {
            if(this.password!==this.verify) {
                alert('两次密码不一致，请重新输入')
            }else if(this.check==null) {
                alert('请同意使用协议！')
            }else if(this.email!==null&&this.password!==null&&this.name!==null&&this.verify!==null) {
                axios.post('http://localhost:8082/api/user', {
                    email:this.email,
                    password:this.password,
                    username:this.name,
                    nikiname:this.name
                }).then(res=> {
                    if(res.data.res=="注册成功") {
                        this.show=false 
                        this.over=false
                    } else {
                        alert("注册失败，用户已存在")
                    }
                }).catch(error=> {
                    console.log(error)
                })
            }  
        }
    }
}
</script>
<style  scoped>  
.slide-fade-enter-active { 
  transition: all .7s;
}
.slide-fade-leave-active {
  transition: all .5s;
}
.slide-fade-enter {
    transform: translateX(-100%)
}
.slide-fade-enter-to {
    transform: translateX(0);
}
 .slide-fade-leave {
    transform: translateX(0);
}
 .slide-fade-leave-to {
  transform: translateX(250%); 
} 
* {
    padding: 0;
    margin: 0
}
ul {
    list-style: none;
    overflow: hidden; 
    margin: 0 99px 0 120px;
    text-align: center;
}
li {
    float: left; 
    padding: 0 20px;
    line-height: 30px;
    font-size: 14px;
}
a {
    color: #707070;
    text-decoration: none;
}
a:hover {
    color: #ff3300;
    cursor: pointer;
}
.logo:hover {
    color: #ff3300;
    cursor: pointer;
}
.active {
    color: #ff3300;
}
.read {
    width: 100%;
    height: 100px;
    background: #FFF; 
}
.content {
    width: 1010px;
    margin: auto;
    padding: 38px 0;
    height: 30px; 
    overflow: hidden;
}
.logo, .title-main, .search, .login {
    float: left;
}
.logo {
    width: 120px;
    line-height: 30px;
    font-size: 14px;
} 
.logo .logo-all {
    float: left;
    width: 20px;
    height: 30px;
    display: block;
    margin-right: 15px;
}
.logo-all .one {
    float: left; 
    width: 4px;
    background: #ee5044;
    display: block;
    border-radius: 2px;
    height: 18px;
    margin: 6px 4px 0 0;
}
.logo-all .two {
    float: left;
    width: 4px;
    background: #ee5044;
    display: block;
    border-radius: 2px;
    height: 28px;
    margin: 0 4px 0 0;
}
.logo-all .three {
    width: 4px;
    float: left;
    background: #ee5044;
    display: block;
    border-radius: 2px;
    height: 18px;
    margin: 6px 0 0 0;
}  
.search, .login {
    float: right;
}
.search {
    box-shadow: 1px 1px 1px rgba(0,0,0,.05);
    height: 20px; 
    width: 150px;
    margin: 5px 0;
}
.search input {
    border: none;
    border-radius: 0;
    background: transparent;
    width: 120px;
    height: 16px;
    line-height: 16px;
    padding: 2px 5px;
    outline: medium;
}
.icon1 {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../assets/search.png) no-repeat;
    background-size: contain;
} 
.login {
    border-left: 1px dotted #CCC;
    height: 20px;
    line-height: 20px;
    margin: 5px 0 5px 20px;
}
.login span {
    font-size: 12px;
    padding-left: 20px;
} 
.login span:hover {
   color: #ff3300;
   cursor: pointer;
}
/* 登录界面 */
.loginipt { 
    position: fixed;
    z-index: 99;
    top: 120px;  
    margin-left: -190px; 
    left: 50%;
    background: #fff;
    padding: 30px 50px 50px;
    width: 280px;  
}
.pop-tit {
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 24px;
}
.form {
    border: 1px solid #dcdcdc;
    padding: 0 15px;
}
.form input {
    height: 20px;
    width: 100%;
    display: block;
    margin: 10px 0;
    border: none;
    outline: medium;
}
.email {
    border-bottom:  1px solid #dcdcdc;
}
.account, .reg-account  {
    padding: 15px 5px;
    overflow: hidden;
}
.account span {
    float: right;
    color: #ee5044;
}
button {
    border: none;
    width: 100%;
    height: 45px;
    background: #eb4235;
    color: #FFF;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
} 
.input {
    position: relative;
}
.off {
     position: absolute;
     top: -45px;
     right: -65px;
     width: 30px;
     height: 30px;
     line-height: 30px;
     background: #444;
     border-radius: 50%;
     text-align: center;
     font-size: 24px;
     color: #ccc;
}
.off:hover {
    background-color: #333;
    color: #fff;
    cursor: pointer;
} 
/* 遮罩层 */
.grey {
   position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; 
    overflow: hidden;
    z-index: 99;
    background-color: rgba(0,0,0,.5);
    pointer-events: none;
}
/* 注册界面 */
.registeript {
    position: fixed;
    z-index: 99;
    top: 120px; 
    left: 50% ;
    margin-left: -190px; 
    background: #fff;
    padding: 30px 50px 50px;
    width: 280px;  
}
.reg-account span {
    color: #ee5044
}
</style>