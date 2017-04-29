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
    data() {
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
    created: function () {

        if (this.getCurrentUser()) {
            this.currentUser = this.getCurrentUser()
            this.refreshData()
        }

    },
    methods: {
        addTodo: function () {
            if (!this.newTodo) {
                return
            }
            let data = {
                title: this.newTodo,
                createdAt: new Date(),
                done: false
            }
            this.todoList.push(data)
            this.newTodo = ''
            console.log(this.todoList);
            this.saveOrUpdateTodos()
        },
        removeTodo: function (todo) {
            let index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
            this.saveOrUpdateTodos()
        },
        signUp: function () {
            console.log('signUp');
            var user = new AV.User()
            user.setUsername(this.formData.username)
            user.setPassword(this.formData.password)
            user.signUp().then(() => {
                this.currentUser = this.getCurrentUser()
            })
        },
        login: function () {
            AV.User.logIn(this.formData.username, this.formData.password)
                .then(() => {
                    this.currentUser = this.getCurrentUser()
                    this.refreshData()
                })
        },
        getCurrentUser: function () {
            if (!AV.User.current()) {  return }
            let {
                id,
                createdAt,
                attributes: {
                    username
                }
            } = AV.User.current()
            return {
                id,
                createdAt,
                username
            }
        },
        loginOut: function () {
            AV.User.logOut();
            this.currentUser = null
        },
        saveTodos: function () {
            let dataString = JSON.stringify(this.todoList)
            var AVTodos = AV.Object.extend('AllTodos')
            var avTodos = new AVTodos()
            var acl = new AV.ACL()
            acl.setWriteAccess(AV.User.current(), true)
            acl.setReadAccess(AV.User.current(), true)
            avTodos.setACL(acl)
            avTodos.set('content', dataString)
            avTodos.save().then(function (todo) {
                this.todoList.id = todo.id
            }, function (error) {})
        },
        updateTodos: function () {
            let dataString = JSON.stringify(this.todoList)
            // console.log(dataString);
            let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
            avTodos.set('content', dataString)
            avTodos.save().then(() => {
                console.log('update success');
            })
        },
        saveOrUpdateTodos: function () {
            if (this.todoList.id) {
                this.updateTodos()
            } else {
                this.saveTodos()
            }
        },
        finish: function() {
            this.saveOrUpdateTodos()
        },
        refreshData: function() {
            var query = new AV.Query('AllTodos');
            query.find().then( (todos) => {

                let avAllTodos = todos[0]
                let id = avAllTodos.id
                this.todoList = JSON.parse(avAllTodos.attributes.content)
                this.todoList.id = id
                console.log(this.todoList);
            }).then(function (todos) {
                // 更新成功
            }, function (error) {
                // 异常处理
            });
        }
    }
})