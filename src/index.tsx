import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './index.scss';
import './../styles/prism.scss';

const root = createRoot(document.querySelector(".main"));
root.render(<App/>);
