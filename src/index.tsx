import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'

import App from './App';
import './../styles/index.scss';
import "./../styles/prism.scss";

window.addEventListener("load", () => ReactDOM.render(<App/>, document.querySelector(".main") as HTMLElement));
