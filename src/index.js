import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';
import { ContextProvider } from './component/SocketIo';
ReactDOM.render(
<ContextProvider>
<App />


</ContextProvider>

, document.getElementById('root'))