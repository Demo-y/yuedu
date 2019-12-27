<template>
     <div class="msg">
        <div class="user">
            <div class="msg-p">
                <img src="../assets/weiwei.png" alt="">
            </div>
            <div class="msg-r">
                <div class="name">{{author.podcast}}
                    <i class="mac"></i>
                </div>
                <div class="production">
                    <div class="status">
                        作品：31
                        <br>
                        粉丝：119
                    </div>
                    <button>关注</button>
                </div>
            </div>
        </div> 
        <div class="user-good"> 
            <div class="very" @click="like()" @mouseenter="enter()" @mouseleave="leave()"> 
                <i class="good" v-if="good"></i> 
                <span v-else class="goods">赞</span>   
            </div> 
            <div class="num">{{author.like_count}}</div>  
            <div class="like" @mouseenter="enter1()" @mouseleave="leave1()">  
                <i class="love" v-if="love"></i> 
                <span v-else class="goods">收藏</span>  
            </div> 
            <div class="num">{{author.collection_count}}</div>
            <div class="mon" @mouseenter="enter2()" @mouseleave="leave2()"> 
                <i class="money" v-if="money"></i> 
                <span v-else class="goods moneys">打赏</span>  
            </div>  
            <div class="img" v-show="!money">
                <img src="../assets/weichat.png" alt="">
            </div>
        </div>
    </div>
</template>
<script> 
import axios from 'axios'
export default {
    name:'UserMessage', 
    data() {
        return {
            num:0,
            num1:0,
            id:null,
            author:'',
            good:true,
            love:true,
            money:true
        }
    }, 
    created() {
        this.id=this.$route.params.id
        this.getId() 
    },
    watch: {
        '$route': {
            handler(to) {  
                this.id=to.params.id
                this.getId()  
            },
            immediate: true
        }
    },
    methods: {
        getId() {
            axios.get("http://localhost:8082/api/article/"+this.id)
            .then(res=> {  
                this.author=res.data.res  
                console.log(res,888)
            }).catch(error=> {
                console.log(error)
            })  
        },
        like() {  
            if(localStorage.getItem('username')==null) {
                alert("请先登录")
            }else { 
                if(this.author.isLiked==false) {
                    axios.post("http://localhost:8082/api/article/"+this.id+"/like", 
                        {
                            headers: {
                                "Content-Type": "application/json", 
                                Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }).then((res)=> {   
                        console.log(res) 
                        this.getId()  
                    }).catch(error=> {
                        console.log(error)
                    }) 
                }else {
                    axios.delete("http://localhost:8082/api/article/"+this.id+"/like", 
                        {
                            headers: {
                                "Content-Type": "application/json", 
                                Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }).then((res)=> {   
                        console.log(res) 
                        this.getId()  
                    }).catch(error=> {
                        console.log(error)
                    }) 
                }
            } 
            
        },   
        enter() {
            this.good=false
        },
        leave() {
             this.good=true
        },
        enter1() {
            this.love=false
        },
        leave1() {
             this.love=true
        },
        enter2() {
            this.money=false
        },
        leave2() {
            this.money=true
        }
    }
}
</script>
<style scoped>
.msg {
    background: #fff;
    margin-bottom: 30px;
    position: relative;
}
.msg:before {
    position: absolute;
    top: 63px;
    left: -20px;
    display: inline-block;
    border-right: 10px solid #fff;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    border-top: 10px solid transparent;
    content: '';
}
.user {
    overflow: hidden;
    padding: 30px;
    border-bottom:  1px dashed #eee;
}
.msg-p {
    float: left;
    width: 80px;
    height: 80px;
}
img {
    width: 100%;
}
.msg-r {
    margin-left: 110px;
}
.name {
    font-size: 16px;
    padding-bottom: 15px;
}
.mac {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url("../assets/mac.png") no-repeat;
    background-size: contain;
}
.status {
    float: left;
}
.production button {
    float: right;
    font-size: 12px;
    padding: 0 15px;
    color: white;
    background: #ee5044;
    line-height: 30px;
    border: none;
}
.user-good {
    position: relative;
    padding: 20px 30px;
    font-size: 18px;
    height: 52px; 
}
.goods {
    display: inline-block; 
    text-align: center;
    font-size: 12px;
    color: #fff;
    width: 50px;
    height: 50px;
    border:1px solid #acacac;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 15px;
    background-color :#acacac;
}
.moneys {
    background: #ee5044;
    border: none
}
.good, .love, .money {
    display: inline-block; 
    width: 50px;
    height: 50px;
    border:1px solid #acacac;
    border-radius: 50%;
    background: url(../assets/good.png) no-repeat;
    background-size: 35%;
    margin-right: 15px;
    background-position: center;
} 
.love {
    background: url(../assets/love.png) no-repeat;
    background-size: 35%;
    margin-right: 15px;
    background-position: center;
}
.money {
    background: url(../assets/money.png) no-repeat;
    background-size: 80%;
    margin-right: 15px;
    background-position: center;
}
.user-good div {  
    float: left;
    height: 52px;
    line-height: 52px; 
}
.user-good .num {
    margin-right: 20px;
}
.img {
    position: absolute;
    bottom: 220px;
    right: 10px;
}
</style>