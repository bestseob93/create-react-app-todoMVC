import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    Write,
    TodoList,
    SortGroup
} from 'components';

import * as uiActions from 'ducks/ui.duck';
import * as todoActions from 'ducks/todo.duck';

class TodoPage extends Component {

    componentDidMount() {
        const { TodoActions }  = this.props;
        TodoActions.getTodoList();
    }

    render() {
        return (
            <div className={this.props.visible.search ? 'container search' : 'container'}>
                <TodoList {...this.props} />
                { this.props.visible.write ? <Write {...this.props} /> : undefined }
                <SortGroup {...this.props} />
            </div>
        );
    }
}


export default connect(
    state => ({
        visible: {
            write: state.ui.getIn(['visible', 'write']),
            search: state.ui.getIn(['visible', 'search'])
        },
        status: {
            items: state.todo.getIn(['requests', 'getTodo']),
            write: state.todo.getIn(['requests', 'add'])
        },
        items: state.todo.get('items')
    }),
    dispatch => ({
        TodoActions: bindActionCreators(todoActions, dispatch),
        UiActions: bindActionCreators(uiActions, dispatch)
    })
)(TodoPage);