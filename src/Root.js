import React from 'react';
import App from 'containers/App';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

function Root({store}) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App} />
            </BrowserRouter>
        </Provider>
    );
}

export default Root;