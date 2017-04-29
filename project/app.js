import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'EGzdmuxs5aAyzQa9XjqGF8dT-gzGzoHsz'
var APP_KEY = 'tBJxlXJeuG8MAWcdWRbdTkIx'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app = new Vue({
    el: '#app',
    data () {
        return {
            newTodo: '',
            todoList: [],
            actionType: 'signUp',
            formData: {
                username: '',
                password: ''
            },
            currentUser: null
        }
    },
    created: function() {
        // 窗口即将被卸载
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList)
            window.localStorage.setItem('myTodos', dataString)
            let newTodo = JSON.stringify(this.newTodo)
            window.localStorage.setItem('newTodo', newTodo)
            let oldUser = JSON.stringify(this.currentUser)
            window.localStorage.setItem('user', oldUser)
        }

        let oldDataString = window.localStorage.getItem('myTodos')
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []

        let oldnewTodo = window.localStorage.getItem('newTodo')
        let oldnewData = JSON.parse(oldnewTodo)
        this.newTodo = oldnewData || ''
        let user = window.localStorage.getItem('user')
        this.currentUser = JSON.parse(user) || ''
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
            this.todoList.splice(index, 1)
        },
        signUp: function() {
            console.log('signUp');
            var user = new AV.User()
            user.setUsername(this.formData.username)
            user.setPassword(this.formData.password)
            user.signUp().then( () => {
                this.currentUser = this.getCurrentUser()
            })
        },
        login: function() {
            AV.User.logIn(this.formData.username, this.formData.password)
                .then( () => {
                    this.currentUser = this.getCurrentUser()
                })
        },
        getCurrentUser: function() {
            let { id, createdAt, attributes: {username} } = AV.User.current()
            return {id, createdAt, username}
        },
        loginOut: function() {
            this.currentUser = null
        }
      }
})