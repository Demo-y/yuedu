<template>
    <div>                       
        <div class="comment">
            <textarea name="" id="" cols="30" rows="10" placeholder="说点什么吧！" v-model.trim="msg"></textarea>
            <button @click="alert()">评论</button>
        </div>
        <div class="comment-list">
            <p class="new">最新评论（{{comments.length}}）</p>
            <ul>
                <div class="nocomment" v-if='comments.length==0'>暂无评论</div>
                <li v-else v-for="(comment,index) in comments" :key="index">
                    <div class="avator">
                        <img :src="comment.avatar" alt="">    
                    </div>    
                    <div class="com">
                        <div class="meta">
                            <span class="username">{{comment.nikiname}}</span>
                            <span class="time">{{comment.reply_time}}</span>
                        </div>
                        <div class="content">{{comment.content}}</div>
                    </div>
                    <div class="del" v-show="comment.nikiname==username" @click="del(comment.id)">删除</div>
                </li> 
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'; 
import bus from '../bus'
export default {
    name:'Comment',
    // /comments/:article_id/page/:page
    data() {
        return {
            length:null,
            comments:[],
            num:1,
            msg:null,
            username:null,
            page:1
        } 
    },  
    created() {
        this.getComment(this.page)
        this.username=localStorage.getItem('username')
         bus.$on('sendNum',(data)=> {  
            this.page=data 
        })  
    },
    methods: { 
        getComment(page) {
            this.comments=[]
            axios.get("http://localhost:8082/api/comments/"+this.$route.params.id+"/page/"+page)
            .then(res=> {
                if(res.data.res_code==400) {
                    this.comments=this.comments
                }else {
                    this.comments=this.comments.concat(res.data.res) 
                }  
            }).catch(error=> {
                console.log(error)
            })
        },
        alert() { 
            if(localStorage.getItem('username')==null) {
                alert("请先登录")
                this.msg=null
            }else if(this.msg==''||this.msg==null) {
                alert("评论内容不能为空") 
            }else{
                axios.post('http://localhost:8082/api/comment',{
                    article_id:this.$route.params.id,
                    content:this.msg
                },
                {
                    headers: {
                        "Content-Type": "application/json", 
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }).then(()=> {   
                    this.getComment(this.page)
                    this.msg=null 
                }).catch(error=> {
                    console.log(error)
                }) 
            }  
        },
        del(id) { 
            axios.delete("http://localhost:8082/api/comment/"+id,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }).then(()=>{   
                 this.getComment(this.page)
            }).catch(error=> {
                console.log(error)
            })
        }
    }
}
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
}
.avator, .com {
    float: left;
}
.avator {
    width: 40px;
}
.com {
    margin-left: 55px;
}
.meta {
    line-height: 22px;
    color: #999;
    margin-bottom: 5px;
}
.username {
    font-size: 14px;
    font-weight: bold;
}
.time {
    margin-left: 8px;
}
.content {
    margin-bottom: 15px;
}
.nocomment {
    color: #707070;
    text-align: center;
    padding: 0 0 30px 0;
    font-size: 16px;
}
.comment { 
    width: 620px;
    overflow: hidden;
    margin-bottom: 30px;
}
.comment textarea {
    float: left;
    width: 550px;
    height: 50px;
    resize: none;
    padding: 10px;
    border: none;
    box-sizing: border-box;
    outline: medium;
}
.comment button {
    float: left;
    width: 70px;
    height: 50px;
    font-size: 12px;
    color: #fff;
    border: none;
    background-color: #ee5044;
    outline: none;
}
.comment-list .new {
    width: 112px;
    height: 40px;
    line-height: 40px;
    color: #ee5044;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    margin-bottom: 0;
}
.comment-list ul {
    background: #fff;
    padding: 30px 30px 0;
    list-style: none;
}
.comment-list li {
    overflow: hidden;
    border-bottom: 1px dashed #EEE;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.head {
    width: 40px;
    height: auto;
    float: left;
}
.head img {
    width: 100%;
}
.con {
    margin-left: 55px;
}
.con-tit {
    margin-bottom: 5px; 
}
.con-tit b {
    font-size: 14px;
}
.con-tit span {
    font-size: 12px;
    margin-left: 8px;
}
.con p {
    font-size: 12px;
}
.comment-right {
    float: right;
    width: 360px;
}
.del {
    float: right;
}
.del:hover {
    cursor: pointer;
}
</style>