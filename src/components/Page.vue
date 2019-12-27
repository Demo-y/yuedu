<template>
<!-- 页码 -->
    <div class="page">
        <ul>
            <li v-if="active==1"></li>
            <li v-else @click="upNum(active-1)">上一页</li>
            <li v-for="(num,index) in page" :key="index" @click="changeNum(num)" :class="{active:active==num}">{{num}}</li>
            <li @click="nextNum(active+1)">下一页</li>
        </ul> 
    </div>
</template>
<script>
import bus from '../bus'
import axios from 'axios'
export default {
    name:'Page',
    data() {
        return {
            active: 1,
            page:[1,2,3,4,5,6,7,8],
            num:null,
            number:null,
            arr:null
        }
    },
    created() { 
        this.getCount(1)
        bus.$on("sendId",(data,number)=> { 
            this.getCount(data) 
            this.active=number 
        }) 
    },
    methods: {
        changeNum(num) { 
            bus.$emit("sendNum",num)
            this.active=num 
        }, 
        nextNum(num) {
            if(num>this.number) {
                this.active=this.number
                bus.$emit("sendNum",this.active)
            }else {
                this.active=num 
                if(num>8) { 
                    this.num=this.page[7]
                    this.num++
                    this.page.push(this.num)
                    this.page=this.page.slice(1,9)
                }
                bus.$emit("sendNum",this.active) 
            }
        },
        upNum(num) {
            if(num>=8) {
                this.active=num
                this.arr=this.page[0]
                if(this.arr>1) {
                    this.arr--
                    this.page.unshift(this.arr)
                    this.page=this.page.slice(0,8)
                } 
                bus.$emit("sendNum",this.active) 
            }else {
                this.active=num
                this.page=this.page
                bus.$emit("sendNum",this.active)
            }
        },
        getCount(tab) { 
            axios.get("http://localhost:8082/api/articles/"+tab+'/page/1', {
            }).then(res=> {    
                if(Math.ceil(res.data.res.count/10)>=8) {
                    this.number=Math.ceil(res.data.res.count/10) 
                    this.page=[1,2,3,4,5,6,7,8] 
                } else {
                    this.number=Math.ceil(res.data.res.count/10) 
                    this.page=[]
                    for(let i=1; i<=this.number; i++) {
                        this.page.push(i)
                    }  
                }
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
.page {
    width: 620px;
    box-sizing: border-box;
    padding: 30px; 
}
ul {
    list-style: none;
    overflow: hidden;
    padding-left: 30%
}
li {
    float: left;
    padding: 3px 10px;
}
li:hover {
    color: #ff3300;
    cursor: pointer;
}
.active {
    color: #ff3300;
}
</style>