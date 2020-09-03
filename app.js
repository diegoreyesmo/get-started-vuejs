var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      joke: ''
    },
    methods: {
        getJoke: function () {
            this.joke = "some joke";
      }
    }
})