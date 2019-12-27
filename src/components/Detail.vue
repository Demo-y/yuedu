<template> 
<!-- 文章内容 -->
    <div class="articles">
        <div class="item">
            <div class="content-tit">{{article.title}}</div>
            <div class="icon"> 
                <span>
                    <i class="pen"></i>
                    {{article.author}}
                </span>
                <span>
                    <i class="voice"></i>
                    {{article.podcast}}
                </span>
                <span>
                    <i class="time"></i>
                    {{article.duration}}
                </span> 
                <span class="play">
                    播放
                    <b>{{article.play_time}}</b>
                    次
                </span>
            </div>
            <div class="picture">
                <img :src="article.img_url" alt="">
            </div>
            <div class="vedio">
                <audio :src="article.mp3_url" controls></audio>
                <i class=" triangle"></i>
            </div>
        </div>
        <div class="article">
            <div class="articlecontent" :style="{height:height}" v-html="article.content"></div>  
            <span class="unfold" @click="unfold()">{{msg}}</span>
            <i :class="{downward:msg=='展开全文',remove:msg=='收起'}"></i>
        </div>  
         <div class="label">
            <b>标签：</b>
            <span>{{article.labels}}</span>
            <div class="share">
                <i class="weibo"></i>
                <i class="dou"></i>
                <i class="qq"></i>
                <i class="weichat"></i>
            </div>
        </div>
        <div class="page">
            <div class="next"  v-if="this.$route.params.id=='1'"></div>
            <div class="up" @click='up()' v-else>
                <i></i>
                上一篇 
            </div> 
            <div class="next"  v-if="this.$route.params.id=='1025'"></div>
            <div class="next"  @click='next()' v-else> 
                下一篇
                <i></i>
            </div> 
        </div> 
    </div>
</template>
<script>
import axios from 'axios'  
export default {
    name:'Detail',
    data() {
        return {
            article: '',
            id: null,
            height:'275px',
            msg:'展开全文'
        }
    },
    created() { 
        this.id=this.$route.params.id
        this.getId() 
    },
    mounted() {
        window.history.forward(0)
    },
    methods: {
        getId() {
            axios.get("http://localhost:8082/api/article/"+this.id)
            .then(res=> { 
                this.article=res.data.res 
            }).catch(error=> {
                console.log(error)
            })  
        },
        up() {
            this.id--,
            this.$router.push('/article/'+this.id)
            this.getId()  
        },
        next() {
            this.id++,
            this.$router.push('/article/'+this.id)
            this.getId()
        },
        unfold() {
            if(this.height=='275px') {
                this.height='auto'
                this.msg='收起'
            }else {
                this.height='275px'
                this.msg='展开全文'
            } 
        }
    }
}
</script> 
<style scoped> 
.articles {
    width: 620px;
    float: left;
}
.item {
    background: #FFF;
    padding: 30px;
    margin-bottom: 30px;
}
.content-tit {
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 8px;
}
.icon {
    color: #999;
    line-height: 20px;
    margin-bottom: 25px;
} 
.icon span {
    margin-right: 20px;
}
.pen, .voice, .time {
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
.icon .play {
    float: right;
    margin-right: 0;
}
.play b {
    font-size: 16px;
    font-weight: normal;
}
.vedio {
    position: relative;
    padding: 30px 0 0 0;
}
audio {
    width: 560px;
}
.triangle { 
    position: absolute;
    top: 45px;
    left: 22px;
    width: 0px;
    height: 0px;
    border: 12px solid transparent;
    border-left-color:#ee5044; 
}
.article {  
    position: relative;
    font-size: 12px; 
    padding: 20px 0px;
    background: #FFF;
    margin-bottom: 30px;
    letter-spacing: 1px;
    line-height: 30px;
}
.articlecontent {
    margin: 20px 30px; 
    overflow: hidden;
}
.label {
    font-size: 12px;
    padding: 5px 30px;
    background: #FFF;
    margin-bottom: 30px;
    line-height: 28px;
}
.label b {
    font-size: 12px;
}
.share {
    float: right;
}
.share i {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 6px 6px 6px 0;
    background: url(../assets/icons.png) no-repeat;
}
.share .weibo {
    background-position: 0 -104px;
}
.share .dou {
    background-position: 0 -468px;
}
.share .qq {
    background-position: 0 -52px; 
}
.share .weichat {
    background-position: 0 -1612px;
}
.page {
    font-size: 14px;
    padding: 0 30px;
    margin-bottom: 30px;
    overflow: hidden;
}
.up:hover {
    color: #ee5044;
    cursor: pointer;
}
.page i {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../assets/left.png) no-repeat;
    background-size: contain;
}
.up {
    float: left;
}
.next {
    float: right;
}
.next:hover {
    color: #ee5044;
    cursor: pointer;
}
.next i {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../assets/right.png) no-repeat;
    background-size: contain;
}
.unfold {
    position: absolute;
    bottom: 15px;
    right: 40px;
    cursor: pointer;
} 
.downward {
    position: absolute;
    bottom: 23px;
    right: 30px;
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../assets/down.png) no-repeat;
    background-size: contain;
}
.remove {
    position: absolute;
    bottom: 24px;
    right: 27px;
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../assets/up.png) no-repeat;
    background-size: contain;
}
</style>