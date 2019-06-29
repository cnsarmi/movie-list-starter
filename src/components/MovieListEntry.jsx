import React from 'react';
import MovieDetails from './MovieDetails.jsx';

class MovieListEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            clicked: false
        }
    }

    toggleDetails() {
        this.setState(
            {clicked: !this.state.clicked}
        )
    }

    handleClick() {
        this.props.toggleWatch(this.props.movie.title);
    }

    render() {
        let displayEntry = () => {
            if (!this.state.clicked) {
                return <div className="movie-title" onClick={this.toggleDetails.bind(this)}>{this.props.movie.title}</div>
                
            } else {
                return <MovieDetails onClick={this.toggleDetails.bind(this)} movie={this.props.movie}/>
            }
        }
        
        return (
            <div className="movie-list-entry media">
                <div className="media-body">
                    {displayEntry()}
                    <button onClick={this.handleClick.bind(this)}>Toggle Watched</button>
                </div>
             </div>
        )
    }
}

export default MovieListEntry;