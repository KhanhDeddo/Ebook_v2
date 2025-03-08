import React from 'react';
import RouterConfig from './routers/router';
import { Provider } from 'react-redux';
import store from '~/redux/store';
import './theme.css';

export default function App() {
  return (
    <Provider store={store}>
      <RouterConfig />
    </Provider>
  );
}
