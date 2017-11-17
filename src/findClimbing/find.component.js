var app = new Vue({
    el: '#app',
    data: {
      place: ''
    },
    methods: {
        submit: function (e) {
            // Make ajax call here
            if(this.place.trim() != ''){
                console.log(this.place);
            }
        }
    }
})