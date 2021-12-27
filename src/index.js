import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import 'semantic-ui-css/semantic.min.css'
import { logout } from './features/auth/authSlice';
import { getAllPlans } from './features/plans/plansSlice';
import './index.css';
import App from './App';

const user = localStorage.getItem("user")

if (!user) {
  store.dispatch(logout())
} else {
  store.dispatch(getAllPlans())
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App></App>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
