import React, { Component } from 'react';

import './SortGroup.css';

class SortGroup extends Component {
    constructor(props) {
        super(props);

        this.handleAllBtnPress = this.handleAllBtnPress.bind(this);
        this.handleCompleteBtnPress = this.handleCompleteBtnPress.bind(this);
        this.handleIncompleteBtnPress = this.handleIncompleteBtnPress.bind(this);
    }

    async handleAllBtnPress() {
        const { TodoActions } = this.props;
        try {
            await TodoActions.getTodoList();
        } catch (e) {
            if(e) console.log(e);
        }
    }

    async handleCompleteBtnPress() {
        const { TodoActions } = this.props;
        try {
            await TodoActions.getTodoList('complete');
        } catch (e) {
            if(e) console.log(e);
        }
    }

    async handleIncompleteBtnPress() {
        const { TodoActions } = this.props;
        try {
            await TodoActions.getTodoList('incomplete');
        } catch (e) {
            if(e) console.log(e);
        }
    }
    render() {
        return (
            <div className="sort_wrapper">
                <button type="button" className="btn_normal" onClick={this.handleAllBtnPress}><span>All</span></button>
                <button type="button" className="btn_normal" onClick={this.handleCompleteBtnPress}><span>Complete</span></button>
                <button type="button" className="btn_normal" onClick={this.handleIncompleteBtnPress}><span>Incomplete</span></button>
            </div>
        );
    }
}

export default SortGroup;