const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => console.log(response.data))
    .catch(error => console.error(error));

    console.log("This is a test!");