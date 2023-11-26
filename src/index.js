import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';

// Create a root for ReactDOM to render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
// Render the App component wrapped in Redux Provider and PersistGate for state management
root.render(
  <Provider store={store}>
    {/* PersistGate delays the rendering until the persisted state is retrieved */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
