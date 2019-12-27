<template>
    <div class="other">
        <h3>
            其他相关节目
            <span>
                <i class="left" @click="left()"></i>
                <i class="right" @click="right()"></i>
            </span>
        </h3>
        <div class="lists" :style="{ marginLeft: distance + 'px' }"> 
            <ul>
                <li v-for="(img,index) in imgs" :key="index" @click="newArticle(img.id)">
                    <div class="list-img">
                        <img :src="img.img_url" alt="">
                    </div>
                    <p>{{img.title}}</p>
                </li>
            </ul>
        </div>
    </div> 
</template>
<script>
import axios from 'axios';
export default {
    name:'Program',
    data() {
        return {
            distance:0,
            imgs:[]
        } 
    },
    created() {
        axios.get('http://localhost:8082/api/articles/rand')
        .then(res=> {
            this.imgs=this.imgs.concat(res.data.res)
        }).catch(error=> {
            console.log(error)
        })
    },
    methods: {
        right() { 
            if(this.distance==-1320) {
                this.distance=-1320
            }else {
                this.distance-=330  
            }
        },
        left() {
            if(this.distance==0) {
                this.distance=0
            }else {
                this.distance+=330
            } 
        },
        newArticle(id) {
            this.$router.push('/article/'+id)
            location.reload(true) 
        }
    }
    
}
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
}
.lists {
    width: 1650px; 
    transition: margin-left .8s;
}
ul {
    list-style: none;
    overflow: hidden;
} 
li {
    padding-top: 30px;
    width: 135px;
    margin-right: 30px;
    float: left;
}
p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
p:hover {
    color: #ee5044;
    cursor: pointer;
}
.list-img img {
    width: 100%;
}
.other {
    padding: 30px;
    background: #fff;
    margin-bottom: 30px;
    overflow: hidden;
}
.other h3 {
    font-size: 14px;
    border-left: 3px solid #ee5044;
    padding-left: 8px;
    line-height: 16px;
}
span {
    float: right; 
}
.left, .right {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../assets/left.png) no-repeat;
    background-size: contain;
}
.right {
    background: url(../assets/right.png) no-repeat;
    background-size: contain;
    margin-left: 5px;
}
</style>