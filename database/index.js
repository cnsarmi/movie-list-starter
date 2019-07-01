const Sequelize = require('sequelize');

const sequelize = new Sequelize('MovieList', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Model = Sequelize.Model;
class Movie extends Model {}

Movie.init({
  movie_id: {
    type: Sequelize.STRING,
    unique: true
  },
  movie: {
    type: Sequelize.STRING,
    allowNull: false
  },
  popularity: {
    type: Sequelize.INTEGER
  }
}, {
  sequelize,
  modelName: 'Movie'
});

Movie.sync().then(() => {
  console.log('Successful sync!');
});

let save = (movie) => {
  Movie.create({ movie_id: movie.id, movie: movie.title, popularity: movie.popularity }).then(movie => {
    console.log("Movies's name: " + movie.title + ". Movie's auto-generated ID: " + movie.id);
  });
}

let get = (callback) => {
    Movie.findAll().then(movies => {
        callback(null, movies);
    });
}

module.exports.save = save;
module.exports.get = get;