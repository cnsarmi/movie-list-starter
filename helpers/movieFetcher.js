const axios = require('axios');

let getMovies = (movieName, callback) => {
    let movie = movieName.replace(' ', '%20');
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=db8c708f81d9c146c049ac611119a674&language=en-US&query=${movie}&page=1&include_adult=false`)
    .then((res) => {
        callback(null, res)
    })
}

module.exports = getMovies;