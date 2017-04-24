import Vue from 'vue'



var app = new Vue({
    el: '#app',
    data () {
        return {
            newTodo: '',
            todoList: [],
        }
    },
    created: function() {
        // 窗口即将被卸载
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList)
            window.localStorage.setItem('myTodos', dataString)
            let newTodo = JSON.stringify(this.newTodo)
            window.localStorage.setItem('newTodo', newTodo)
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

        let oldnewTodo = window.localStorage.getItem('newTodo')
        let oldnewData = JSON.parse(oldnewTodo)
        this.newTodo = oldnewData || ''
    },
    methods: {
        addTodo: function() {
            if (!this.newTodo) { return }
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                done: false
            })
            this.newTodo = ''
            console.log(this.todoList);
        },
        removeTodo: function(todo) {
            let index = this.todoList.indexOf(todo)
            this.todoList.pop()
            this.todoList.splice(index, 1)
        }
    }
})