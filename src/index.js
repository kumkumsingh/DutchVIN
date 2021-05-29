import React from 'react';
import ReactDOM from "react-dom";
import Pages from './pages/pages';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./redux/store";

import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Pages />
            </BrowserRouter>
        </Provider>,
    document.getElementById('root')
);
