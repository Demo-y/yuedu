<template>
  <div id="app">
    <tab></tab>
    <router-view></router-view> 
    <foot></foot>
  </div>
</template>
<script> 
import Tab from './components/Tab';  
import Foot from './components/Foot'; 
export default {
  data() {
    return {
      show:true,
    }
  },
  components: { 
    Tab,
    Foot
  } 
}
</script> 
