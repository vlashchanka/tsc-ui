import { h, render } from 'preact';
import 'preact/devtools';
import App from './App.js';
import './index.css';
import { StoreContext } from 'storeon/preact'
import {store} from "./store/store";
const root = document.getElementById('root');

if (root) {
  render(<StoreContext.Provider value={store}>
    <App/>
  </StoreContext.Provider>, root);
}
