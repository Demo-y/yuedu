<template>
<!-- 列表 -->
 <div class="items">
    <ul> 
        <li v-for="(list,index) in lists" :key="index">
            <div class="list-img" @click="jump(list.id)">
                <img :src="list.img_url" alt="">
            </div>
            <div class="list-content">
                <div class="list-title">
                    <p @click="jump(list.id)">{{list.title}}</p>
                </div> 
                <div class="detail">
                    <span>
                        <i class="pen"></i>
                        {{list.author}}
                    </span>
                    <span>
                        <i class="voice"></i>
                        {{list.podcast}}
                    </span>
                    <span>
                        <i class="time"></i>
                        {{list.duration}}
                    </span>
                    <span>
                        <i class="ear"></i>
                        {{list.play_time}}
                    </span>
                </div>
                <div class="matter">{{list.content.slice(0,70)+"..."}}</div>
            </div>
        </li>
    </ul>
 </div>
</template>
<script>
import axios from 'axios';
import bus from '../bus'
export default {
    name: "Items",
    data() {
        return {
            lists:[], 
            tabId:1,
            pageNum:1,
            path:null,
            page:8
        }
    },
    // /articles/:type_id/page/:page 
    created() {   
        bus.$on('sendId',(data)=> { 
            this.tabId=data 
            this.getVal(data,this.pageNum)  
        })
        bus.$on('sendNum',(data)=> {  
            this.getVal(this.tabId,data) 
        })    
    }, 
     watch: {
        '$route': {
            handler(to,from) { 
                if(to.path=='/') {
                    this.getVal(1,1) 
                    this.tabId=1
                    this.pageNum=1
                } 
                this.path=from 
            },
            immediate: true
        }
    },
    methods: {
        getVal(tab,num) { 
            axios.get("http://localhost:8082/api/articles/"+tab+'/page/'+num, {
            }).then(res=> {
                this.lists=[],  
                this.lists=this.lists.concat(res.data.res.articles)  
            }).catch(error=> {
                console.log(error)
            })  
        },
        jump(val) {
            this.$router.push('/article/'+val)
        }
    }
}
</script>
<style scoped>
* {
    padding: 0;
    margin: 0
} 
ul {
    width: 620px;
    list-style: none;
}
li {
    overflow: hidden;
    margin-bottom: 30px;
    background-color: #fff;
}
p:hover {
    color: #ff3300;
    cursor: pointer;
}
.list-img {
    float: left;
    width: 210px;
    height: 210px;
}
.list-img img {
    width: 100%;
    height: 100%;
}
.list-content {
    float: left;
    padding: 30px; 
}
.list-title {
    width: 350px;
    font-size: 18px;
    margin-bottom: 10px;
}
.detail {
    color: #999;
    margin-bottom: 25px;
}
.detail span {
    margin-right: 15px;
}
.matter {
    width: 350px;
}
.pen, .voice, .time, .ear {
    display: inline-block;
    width: 12px;
    height: 12px; 
    background: url("../assets/pen.png") no-repeat;
    background-size: contain;
}
.voice {
    background: url("../assets/mac.png") no-repeat;
    background-size: contain;
}
.time {
    background: url("../assets/time.png") no-repeat;
    background-size: contain;
}
.ear {
    background: url("../assets/ear.png") no-repeat;
    background-size: contain;
} 
</style>