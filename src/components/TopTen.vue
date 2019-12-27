<template>
<!-- 悦读频道 TOP10 -->
    <div class="other">
        <h3><span>{{choice}}</span> 频道 TOP10</h3>
        <div class="headline">
            <ol>
                <li v-for="(articleList,index) in articleLists" :key="index">
                    <p @click="jump(articleList.id)">{{articleList.title}}</p>
                    <div class="anchor">
                        <span>文:{{articleList.author}}</span>
                        <span>主播:{{articleList.podcast}}</span>
                    </div> 
                </li>  
            </ol>
        </div> 
    </div> 
</template>
<script>
import axios from 'axios';
import bus from '../bus'
export default {
    name:'TopTen',
    data() {
        return {
            id: 1,
            articleLists:[],
            choice:'悦读'
        }
    },
    created() {
        this.getId(this.id)
        bus.$on('sendId',(data)=> { 
            this.getId(data)
            this.choice=data==1?'悦读':data==2?'情感':data==3?'连播':data==4?'校园':data==5?'音乐':'Labs'
        }) 
    },
    methods: {
        getId(id) {
            this.articleLists=[]
            axios.get('http://localhost:8082/api/articles/'+id+'/top10')
            .then(res=>{
                this.articleLists=this.articleLists.concat(res.data.res.articles).slice(0,10) 
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
.other {
    padding: 30px;
    background: #fff;
    margin-bottom: 30px;
    overflow: hidden;
} 
h3 {
    font-size: 14px;
    border-left: 3px solid #ee5044;
    padding-left: 8px;
    line-height: 16px;
    margin: 0;
} 
ol {
    padding: 30px 0 0 15px; 
    margin: 0;
}
p:hover {
    color: #ee5044;
    cursor: pointer;
}
li {
    padding-bottom: 10px;
    border-bottom: 1px dashed #eee;
    margin-bottom: 10px;
    line-height: 15px; 
}
li:last-child {
    border: none;
    margin-bottom:0;
    padding-bottom:0
}
.anchor {
    color: #999;
} 
.anchor span {
    margin-right: 20px;
}
</style>