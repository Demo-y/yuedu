<template>  
    <div class="content-all">
        <div class="content"> 
            <items></items>
            <page></page>   
        </div>
        <div class="message">
            <content-img></content-img>
            <top-ten></top-ten>
            <bottom-img></bottom-img> 
        </div> 
    </div>  
</template>
<script>  
import Items from '../components/Items'
import Page from '../components/Page'
import ContentImg from '../components/ContentImg'
import TopTen from '../components/TopTen' 
import BottomImg from '../components/BottomImg' 
export default {
    name:'Content',
    components: { 
        Items,
        Page,
        ContentImg,
        TopTen,
        BottomImg
    } 
}
</script>
<style scoped>
* {
    padding: 0;
    margin: 0;
}
.content-all {
    width: 1010px;
    margin: auto;
    padding: 40px 0;
    overflow: hidden;
}
.content { 
    float: left; 
}
.message {
    width: 360px;
    float: right;
}
</style>