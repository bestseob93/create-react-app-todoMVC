import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    }

    handleSubmit() {
        const { TodoActions } = this.props;
        TodoActions.searchTodo(this.state.searchQuery);
        this.setState({
            searchQuery: ''
        });
    }

    handleEnterPress(e) {
        if(e.charCode === 13) {
            console.log('search');
            this.handleSubmit();
        }
    }

    render() {
        return (
            <div className="search_container">
                <input 
                    type="text"
                    className="search_input"
                    name="search"
                    onChange={this.handleChange}
                    value={this.state.searchQuery}
                    onKeyPress={this.handleEnterPress}
                    placeholder="검색할 단어를 입력하세요"
                />
            </div>
        );
    }
}

export default Search;