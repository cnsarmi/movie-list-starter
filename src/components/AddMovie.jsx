import React from 'react';

class AddMovie extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <input onChange={this.props.onChange} type="text"></input>
                <input onClick={this.props.onClick} type="submit" value="Add Movie"></input>
            </div>
        )
    }

}

export default AddMovie;