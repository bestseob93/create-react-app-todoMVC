import React, { Component} from 'react';
import axios from 'axios';

import './Write.css';

class Write extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            valid: false,
            address: '',
            title: '',
            description: '',
            dateTime: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateTime = this.handleDateTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.onLocationPress();
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    
    handleDateTime(e) {
        this.setState({
            dateTime: e.target.value
        });
    }

    onLocationPress = () => {
        let self = this;
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                const {latitude, longitude} = coords;
                self.getCurrentAddress(latitude, longitude);
            },
            (error) => console.log(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    getCurrentAddress = (lat, lng) => {
        this.setState({
            loading: true,
            valid: false
        });

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

    async handleSubmit(e) {
        const { TodoActions } = this.props;
        
        let data = {
            title: this.state.title,
            description: this.state.description,
            location: this.state.address,
            date: this.state.dateTime,
            checked: false
        };

        if(this.state.title === '' || typeof this.state.title !== 'string') {
            alert("제목을 입력해주세요!");
        } else if(this.state.description === '' || typeof this.state.description !== 'string') {
            alert("내용을 입력해주세요!");
        } else if(this.state.address === '' || typeof this.state.address !== 'string') {
            alert("주소를 받아오는중이에요!");
        } else {
            try {
                await TodoActions.addTodo(data);
                await TodoActions.getTodoList();
            } catch (e) {
                if(e) console.log(e);
            }
        }
    }

    clearState = () => {
        this.setState({
            loading: false,
            valid: false,
            address: '',
            title: '',
            description: ''
        });
    }

    componentWillUnmount() {
        this.clearState();
    }

    render() {
        console.log(this.state);
        return (
            <div className="write-box">
                <div className="input_wrapper">
                    <div className="input_field">
                        <span>
                            제목
                        </span>
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input_field">
                        <span>
                            내용
                        </span>
                        <textarea
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>
                    <div className="input_field">
                        <span>
                            날짜
                        </span>
                        <input
                            type="date"
                            name="datetime"
                            onChange={this.handleDateTime}
                        />
                    </div>
                </div>
                <div className="submit_box">
                    <button className="add_btn" onClick={this.handleSubmit}><span>{this.props.status.write.get('fetching') ? 'Loading...' : '올리기'}</span></button>
                </div>
            </div>
        );
    }
}

export default Write;