import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<BrowserRouter>
  <UserProvider>
    <App />
  </UserProvider>
</BrowserRouter>, 
document.getElementById('root'),
);

serviceWorker.unregister();
