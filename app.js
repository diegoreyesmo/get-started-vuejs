var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      joke: ''
    },
    methods: {
        getJoke: function () {
            let fetchData = async () => {
                let response = await fetch('http://api.icndb.com/jokes/random');
                if (response.ok) { 
                    let {value} = await response.json();
                    this.joke = value.joke;
                } else {
                    alert("HTTP-Error: " + response.status);
                }
            }
            fetchData();
        }
    }
})