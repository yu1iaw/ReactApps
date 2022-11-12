import React from 'react';

import './search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            row: ''
        }
    }

    onUpdate = (e) => {
        const row = e.target.value;
        this.setState({row});
        this.props.onUpdateSearch(row);
    }

    render() {
        return (
            <input
                type='text'
                className='form-control search-input'
                placeholder='Пошук завдання'
                value={this.state.row}
                onChange={this.onUpdate}/>
        )
    }
}

export default Search;