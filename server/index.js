const express = require('express');
const app = express();
const port = 3000;
const movieFetcher = require('../helpers/movieFetcher.js');
const db = require('../database/index.js');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/../client/dist'));

app.post('/api/movies', (req,res) => {
    movieFetcher(req.body.movie, (err, movies) => {
        if (err) {
            console.log('ERROR IN app.post');
            res.status(500).send();
        } else {
            db.save(movies.data.results[0]);
            res.status(200).send(movies.data.results[0]);
        }
    })
})

app.get('/api/movies', (req, res) => {
    db.get((err, movies) => {
        if (err) {
            res.status(500).send();
        } else {
            console.log('yeeeee');
            res.status(200).send(movies);
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));