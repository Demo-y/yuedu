<template>
<!-- 底部 -->
    <div class="footer-content">
        <div class="as">
            <p>
                <span>关于我们</span>
                |
                <span>加入我们</span>  
            </p> 
            <p>
                <span>© 2010-2016 Yuedu.fm All rights reserved</span> 
                <span>粤ICP备14076392号</span>  
            </p>
        </div>
        <div class="img">
            <div>
                <i class="wei"></i> 
            </div> 
            <div>
                <i class="chat"></i>
            </div>
            <div>
                <i class="donate"></i> 
            </div> 
        </div> 
    </div>
</template>
<script>
export default {
    name:'Foot',
}
</script>
<style scoped>
.footer-content {
    width: 1010px;
    margin: auto;
    padding-bottom: 40px;
    overflow: hidden;
}
.footer-content .as {
    float: left; 
}
.footer-content p {
    margin-bottom: 8px;
}
.footer-content p:last-child {
    color: #aaa;
}
.img {
    float: right;
}
.img div {
    position: relative;
    float: right;
    width: 40px;
    height: 40px;
    background-color: #ddd;
    border-radius: 50%; 
    margin-left: 10px;
}
.img i {
    position: absolute;
    top: 10px;
    left: 10px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #ddd;
}
.img .donate {
    background: url(../assets/donate.png) no-repeat;  
    background-size: contain;
}
.img .chat {
    background: url(../assets/chat.png) no-repeat;  
    background-size: contain;
}
.img .wei {
    background: url(../assets/wei.png) no-repeat;  
    background-size: contain;
}
</style>