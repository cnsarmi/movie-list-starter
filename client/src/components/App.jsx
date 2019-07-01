import React from 'react';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import AddMovie from './AddMovie.jsx';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            isFiltered: false,
            filter: '',
            newMovie: '',
            showToWatch: true,
            showWatched: false
        }
    }

    componentDidMount() {
        axios.get('/api/movies')
        .then ((res) => {
            console.log('state set')
            this.setState(
                {movies: res.data}
            )
            console.log(this.state.movies);
        })
    }

    handleChange(event) {
        event.preventDefault();
        this.setState(
            {filter: event.target.value}
        )
    }

    handleClick() {
        this.setState(
            {isFiltered: !this.state.isFiltered}
        )
    }

    getMovie(event) {
        this.setState(
            {newMovie: event.target.value}
        )
    }

    addMovie() {
        let temp = [
            {movie: this.state.newMovie,
            watched: false            
            }
        ]
        this.setState({
            movies: this.state.movies.concat(temp)
        })
    }

    toggleWatch(movie) {
        var temp = this.state.movies;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].movie === movie) {
                temp[i].watched = !temp[i].watched
            }
        }
        this.setState(
            {movies: temp}
        )
    }

    showToWatch() {
        this.setState(
            {showToWatch: true,
            showWatched: false}
        )
    }

    showWatched() {
        this.setState(
            {showWatched:true,
            showToWatch: false}
        )
    }

    render() {
        let generateMovieList = () => {
            if(this.state.isFiltered) {
                let watchedMovies = (this.state.movies.filter((movie) => movie.watched));
                let toWatchMovies = (this.state.movies.filter((movie) => !movie.watched));
                if(this.state.showToWatch) {
                    let filteredMovies = (toWatchMovies.filter((movie) => movie.title.includes(this.state.filter)))
                    return <MovieList movies={filteredMovies} toggleWatch={this.toggleWatch.bind(this)}/>
                } else {
                    let filteredMovies = (watchedMovies.filter((movie) => movie.title.includes(this.state.filter)))
                    return <MovieList movies={filteredMovies} toggleWatch={this.toggleWatch.bind(this)}/>
                } 
            } else {
                let watchedMovies = (this.state.movies.filter((movie) => movie.watched));
                let toWatchMovies = (this.state.movies.filter((movie) => !movie.watched));
                if(this.state.showToWatch) {
                    return <MovieList movies={toWatchMovies} toggleWatch={this.toggleWatch.bind(this)}/>
                } else {
                    return <MovieList movies={watchedMovies} toggleWatch={this.toggleWatch.bind(this)}/>
                } 
            }
        }

        return (
            <div>
                <h1>Movie List</h1>
                <AddMovie onClick={this.addMovie.bind(this)} onChange={this.getMovie.bind(this)}/>
                <Search handleChange={this.handleChange.bind(this)} handleClick={this.handleClick.bind(this)} filter={this.state.filter}/>
                <button onClick={this.showToWatch.bind(this)}>To Watch</button>
                <button onClick={this.showWatched.bind(this)}>Watched</button>    
                {generateMovieList()}
            </div>
        )
    }
}

export default App;