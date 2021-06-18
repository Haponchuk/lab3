<template>
  <div class="container">
    <h1>Todo List</h1>

    <div v-if="!isEditing">
      <input type="text" v-model="text">
      <input type="submit" value="Add" @click="storeTodo">
    </div>

    <div v-else>
      <input type="text" v-model="text">
      <input type="checkbox" v-model="completed">
      <input type="submit" value="Update" @click="updateTodo">
    </div>

    <ol>
      <li v-for="todo in todos" :key="todo._id">
        <s v-if="todo.completed">{{ todo.text }}</s>
        <span v-else>{{ todo.text }}</span>
        <button @click="editTodo(todo)">Edit</button>
        <button @click="removeTodo(todo._id)">Delete</button>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Todo',

  data() {
    return {
      isEditing: false,
      text: '',
      todos: [],
      completed: false,
      selectedTodo: null,
    }
  },

  methods: {
    getTodos() {
      this.axios.get('http://localhost:3000/todos')
        .then((data) => {
          this.todos = data.data
        })
    },

    storeTodo() {
      this.axios.post('http://localhost:3000/todos', {
        text: this.text,
      })
        .then((data) => {
          this.todos.push(data.data)
          this.text = ''
        })
    }, 

    removeTodo(id) {
      this.axios.delete(`http://localhost:3000/todos/${id}`)
        .then(() => {
          if (this.selectedTodo && this.selectedTodo._id === id) {
            this.text = ''
            this.isEditing = false
          }

          this.getTodos()
        })
    },

    updateTodo() {
      if (this.selectedTodo && (this.selectedTodo.text !== this.text || this.selectedTodo.completed !== this.completed)) {
        this.axios.put(`http://localhost:3000/todos/${this.selectedTodo._id}`, {
          text: this.text,
          completed: this.completed,
        })
          .then(() => {
            this.getTodos()
          })
      }

      this.text = ''
      this.isEditing = false
      this.completed = false
      this.selectedTodo = null
    },

    editTodo(todo) {
      this.isEditing = true
      this.text = todo.text
      this.completed = todo.completed
      this.selectedTodo = todo
    }
  },

  beforeMount() {
    this.getTodos()
  }
}
</script>