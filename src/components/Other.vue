<template>
    <!-- 悦读FM频道其他节目 -->
     <div class="other">
        <h3>
            悦读FM频道其他节目
            <span>
                查看全部
                <i class="right"></i>    
            </span>
        </h3>
        <div class="headline">
            <ul>
                <li v-for="(other,index) in others" :key="index" @click="newPage(other.id)">
                    <p>{{other.title}}</p>
                    <div class="anchor">
                        <span>文：{{other.author}}</span>
                        <span>主播：{{other.podcast}}</span>
                    </div>
                </li> 
            </ul>
        </div> 
    </div> 
</template>
<script>
import bus from '../bus';
import axios from 'axios';
export default {
    name:'Other',
    data() {
        return {
            id:1,
            others:[]
        }
    },
    created() {
        this.others=[]
        this.getId(this.id)
        bus.$on('sendId',(data)=> { 
            this.getId(data)
        }) 
    },
    methods: {
        getId(id) { 
            axios.get('http://localhost:8082/api/articles/'+id+'/rand')
            .then(res=>{  
                this.others=this.others.concat(res.data.res)
            }).catch(error=> {
                console.log(error)
            })
        },
        newPage(id) { 
            this.$router.push('/article/'+id)
            location.reload(true) 
        }
    } 
}
</script>
<style scoped>
* {
    padding: 0;
    margin: 0
}
.other {
    padding: 30px;
    margin-bottom: 30px;
    background-color: #fff;
}
.other h3 {
    font-size: 14px;
    border-left: 3px solid #ee5044;
    padding-left: 8px;
    line-height: 16px;
}
.left, .right {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../assets/left.png) no-repeat;
    background-size: 90%;
}
.right {
    background: url(../assets/right.png) no-repeat;
    background-size: contain;
}
.list-l {
    float: left;
    margin-right: 30px;
}
.list1 {
    padding-top: 30px;
}
.list1 p {
    padding-top: 10px;
}
p:hover {
    color: #ee5044;
    cursor: pointer;
}
.other span {
    float: right;
    font-size: 12px; 
    font-weight: normal;
}
.headline ul {
    list-style: none;
    padding-top: 30px;
}
.headline  li {
    padding-bottom: 10px;
    border-bottom: 1px dashed #eee;
    margin-bottom: 10px;
    line-height: 20px;
    overflow: hidden;
}
.headline  li:last-child {
    border: none;
    margin-bottom:0;
    padding-bottom:0
}
.anchor span{
    float: left;
    color: #999;
}
</style>