import React from 'react';
import axios from 'axios';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieDetails: {}
        }
    }

    componentDidMount() {
        let movie = this.props.movie.title.replace(' ', '%20')
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=db8c708f81d9c146c049ac611119a674&language=en-US&query=${movie}&page=1&include_adult=false1`)
        .then((res) => {
            this.setState(
                {movieDetails: res.data.results[0]}
            )
        })
    }

    render() {
        return (
            <div className="movie-details">
                <div className="movie-title" onClick={this.props.onClick}>
                    {this.props.movie.title}
                    <div className="details">Year: {this.state.movieDetails.release_date}</div>
                    <div className="details">OverView: {this.state.movieDetails.overview}</div>
                    <div className="details">Popularity: {this.state.movieDetails.popularity}</div>
                    <div className="details">Vote Average: {this.state.movieDetails.vote_average}</div>
                </div>
            </div>
            
        )
    }
}

export default MovieDetails;