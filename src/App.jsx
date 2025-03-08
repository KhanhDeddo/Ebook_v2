import React from 'react';
import RouterConfig from './routers/router';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '~/redux/store'
import './theme.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterConfig/>
    </Provider>
  </StrictMode>
)
