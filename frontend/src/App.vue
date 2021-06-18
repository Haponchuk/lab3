<template>
  <div id="app">
    <Todo/>
  </div>
</template>

<script>
import Todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>

<style>
.container {
  max-width: 960px;
  margin: 0 auto;
}
h1 {
  padding-top: 40px;
}
</style>
