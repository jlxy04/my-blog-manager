<template>
  <div id="app">
    这是一个分类页面
    组件~~~~~
    组件~~~~~
    组件~~~~~
    组件~~~~~
    <a href="/index.html">去首页</a> 
    <a href="/cart.html">去购物车</a> 
    
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 32px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
