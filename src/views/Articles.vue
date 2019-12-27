<template> 
<div class="box">
    <div class="articles-all">
        <div class="articles-left">
            <Detail></Detail> 
            <Comment></Comment>
        </div>
        <div class="articles-right">
            <user-message></user-message>
            <Program></Program>
            <other></other>
        </div>
    </div>
</div> 
</template>
<script>  
import Detail from '../components/Detail'
import UserMessage from '../components/UserMessage'
import Other from '../components/Other'
import Program from '../components/Program'
import Comment from '../components/Comment'
export default {
    name:'Articles', 
    components: {
        Detail, 
        UserMessage,
        Other,
        Program,
        Comment
    } 
}
</script> 
<style scoped> 
.articles-all {
    width: 1010px; 
    overflow: hidden;
    margin: auto; 
    padding: 40px 0;
} 
.articles-left {
    width: 620px;
    float: left;
}
.articles-right {
    width: 360px;
    float: right
}
</style>