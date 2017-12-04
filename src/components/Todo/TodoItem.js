import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import {
    Spinner
} from 'components';

import './TodoItem.css';

class TodoItem extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        location: PropTypes.string.isRequired,
        date: PropTypes.object,
        todoDone: PropTypes.bool
    }

    static defaultProps = {
        index: 0,
        title: 'Lotte Spec',
        description: 'hihi',
        location: '서울특별시 중구 을지로 158 상품빌딩 롯데닷컴',
        date: new Date(),
        todoDone: false
    }
    
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            valid: false,
            address: '',
            editMode: false,
            moreInfoMode: false,
            title: '',
            description: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckPress = this.handleCheckPress.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleMoreInfo = this.handleMoreInfo.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    renderDate = (date) => {
        return moment().format('YYYY년 MM월 DD일');
    }

    handleCheckPress() {
        const { TodoActions } = this.props;
        TodoActions.toggleDone(this.props.index);
        TodoActions.getTodoList();
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    toggleEditMode() {
        this.setState({
            editMode: !this.state.editMode
        });
    }

    async handleEditSubmit() {
        const { TodoActions } = this.props;
        const data = {
            title: this.state.title,
            location: this.state.address || this.props.location,
            description: this.state.description
        };

        try {
            await TodoActions.editTodo(this.props.index, data);
            this.toggleEditMode();
            await TodoActions.getTodoList();
        } catch (e) {
            if(e) console.log(e);
        }
    }

    handleMoreInfo() {
        this.setState({
            moreInfoMode: !this.state.moreInfoMode
        });
    }
    
    async handleDelete() {
        const { TodoActions } = this.props;
        try {
            await TodoActions.deleteTodo(this.props.index);
            await TodoActions.getTodoList();
        } catch (e) {
            if(e) console.log(e);
        }
    }


    refreshLocation = () => {
        let self = this;
        this.setState({
            loading: true,
            valid: false
        });
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                const {latitude, longitude} = coords;
                self.getCurrentAddress(latitude, longitude);
            },
            (error) => console.log(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    getCurrentAddress = (lat, lng) => {
        axios({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=AIzaSyAZ4wxXzeheT3jy1dRY-8kyTLdO4Vl0AJI`
        }).then( res => {
            this.setState({
                address: res.data.results[3].formatted_address,
                loading: false,
                valid: false
            });
        }).catch( err => {
            this.setState({
                loading: false,
                valid: false
            });

            if(err) throw err;
        });
    };

    render() {
        console.log('hi' + this.state.loading);
        if(!this.props.todoDone) {
            return (
                <li className={this.props.index % 2 === 1 ? 'todo_item_box' : 'todo_item_box odd'}>
                    <section className="item">
                        <aside>
                            <span>{this.props.index}</span>
                            <input type="checkbox" onChange={this.handleCheckPress} checked={this.props.todoDone} />
                        </aside>
                        <div className="item_body">
                            <header>
                                {
                                    this.state.editMode ?
                                    <input
                                        type="text"
                                        className="item_title"
                                        name="title"
                                        placeholder={this.props.title}
                                        onChange={this.handleChange}
                                    /> :
                                    <h3 className="item_title">
                                        {this.props.title}
                                    </h3>
                                }
                                
                                <div className="sub_info">
                                    <span
                                        className="item_location"
                                        onClick={this.state.editMode ? this.refreshLocation: () => {}}
                                        style={this.state.editMode ? {cursor: 'pointer'} : undefined}
                                    >
                                        {this.state.loading ? <Spinner /> : this.state.address || this.props.location}
                                    </span>
                                    <span className="item_date">{this.props.date} 까지</span>
                                </div>
                            </header>
                            {this.state.editMode ?
                                <div className="description_wrapper">
                                    <textarea
                                        className="item_description"
                                        name="description"
                                        placeholder={this.props.description}
                                        onChange={this.handleChange}
                                    />
                                </div> :
                                <div className="description_wrapper">
                                    <p className={this.state.moreInfoMode ? 'item_description content_all' : 'item_description'}>{this.props.description}</p>
                                    <button className="item_more" onClick={this.handleMoreInfo}>{this.state.moreInfoMode ? '접기' : '더 보기'}</button>
                                </div>
                            }
                        </div>
                        {
                            this.state.editMode ?
                            <div className="btn_wrapper">
                                <span className="edit_submit" onClick={this.handleEditSubmit}>수정하기</span>
                            </div> :
                            <div className="btn_wrapper">
                                <FontAwesome name="edit" onClick={this.toggleEditMode} />
                                <FontAwesome name="times" onClick={this.handleDelete} />
                            </div>
                        }
                    </section>
                </li>
            );
        } else {

            return (
                <li className={this.props.index % 2 === 1 ? 'todo_item_box' : 'todo_item_box odd'}>
                    <section className="item">
                        <aside>
                            <span>{this.props.index}</span>
                            <input type="checkbox" onChange={this.handleCheckPress} checked={this.props.todoDone} />
                        </aside>
                        <div className="item_body">
                            <header>
                                <h3 className="item_title done">
                                    {this.props.title}
                                </h3>
                                <div className="sub_info">
                                    <span className="item_location done">{this.props.location}</span>
                                    <span className="item_date done">{this.props.date} 까지</span>
                                </div>
                            </header>
                            <div className="description_wrapper">
                                <p className="item_description done">{this.props.description}</p>
                                <p className="item_more done">더 보기</p>
                            </div>
                        </div>
                        <div className="btn_wrapper">
                            <FontAwesome name="times" onClick={this.handleDelete} />
                        </div>
                    </section>
                </li>
            );
        }
    }
}

export default TodoItem;