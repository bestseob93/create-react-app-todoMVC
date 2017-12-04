import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoPage from './Pages/TodoPage';
import {
  Title,
  Icons,
  Search
} from 'components';

import './App.css';

import * as todoActions from 'ducks/todo.duck';
import * as uiActions from 'ducks/ui.duck';

class App extends Component {
  toggleSearch = () => {
    const { UiActions } = this.props;
    if(this.props.visible.search) {
        UiActions.hideSearch();
    } else {
        UiActions.showSearch();
    }
  }

  toggleWrite = () => {
    const { UiActions } = this.props;
    if(this.props.visible.write) {
        UiActions.hideWrite();
    } else {
        UiActions.showWrite();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="title_icons">
            <Title />
            <Icons
              toggleSearch={this.toggleSearch}
              toggleWrite={this.toggleWrite}
              searchVisible={this.props.visible.search}
              writeVisible={this.props.visible.write}
            />
          </div>
          { this.props.visible.search ? <Search {...this.props} /> : undefined }
        </header>
        <Route path="/" component={TodoPage} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    visible: {
      search: state.ui.getIn(['visible', 'search']),
      write: state.ui.getIn(['visible', 'write'])
    }
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch),
    UiActions: bindActionCreators(uiActions, dispatch)
  })
)(App);
