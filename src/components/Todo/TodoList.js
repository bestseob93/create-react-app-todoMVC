import React, { Component} from 'react';
import {
    TodoItem,
    Spinner
} from 'components';

import './TodoList.css';

class TodoList extends Component {
    async componentDidMount() {
        const { TodoActions } = this.props;
        try {
            await TodoActions.getTodoList();
        } catch (e) {
            if(e) console.log(e);
        }
    }

    renderTodoList = (datas) => {
        
        const mappedData = datas.toJS().map((data, index) => {
            return <TodoItem
                        key={index}
                        index={index}
                        title={data.title}
                        description={data.description}
                        location={data.location}
                        todoDone={data.checked}
                        date={data.date}
                        TodoActions={this.props.TodoActions}
                    />;
        });

        return mappedData;
    }
    
    render() {
        console.log(this.props.status.items.get('fetching'));
        return (
            <div className="list_container">
                { this.props.status.items.get('fetching') ? 
                <Spinner /> :
                undefined }
                { this.renderTodoList(this.props.items) }
            </div>
        )
    }
}

export default TodoList;