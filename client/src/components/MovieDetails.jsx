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
        let movie = this.props.movie.movie.replace(' ', '%20')
        axios.post('/api/movies', {movie: movie})
        .then((res) => {
            this.setState(
                {movieDetails: res.data}
            )
        })
    }

    render() {
        return (
            <div className="movie-details">
                <div className="movie-title" onClick={this.props.onClick}>
                    {this.props.movie.movie}
                    <div className="details">Year: {this.state.movieDetails.release_date}</div>
                    <div className="details">Popularity: {this.state.movieDetails.popularity}</div>
                </div>
            </div>
            
        )
    }
}

export default MovieDetails;