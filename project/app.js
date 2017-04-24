import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data () {
        return {
            newTodo: '',
            todoList: []
        }
    },
    methods: {
        addTodo: function() {
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date()
            })
            this.newTodo = ''
            console.log(this.todoList);
        }
    }
})